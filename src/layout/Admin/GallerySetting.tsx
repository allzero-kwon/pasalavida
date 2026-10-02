import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { ref as dbRef, onValue, set, push, remove, get } from "firebase/database";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { realtimeDb, storage } from "@/firebase";
import { Reorder, AnimatePresence } from "framer-motion";

interface Photo {
    id: string;
    url: string;
    name: string;
    width: number;
    height: number;
}

interface GallerySettingProps {
    id: string;
}

const GallerySetting: React.FC<GallerySettingProps> = ({ id }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const [layout, setLayout] = useState("grid"); // grid, slide, scroll

    useEffect(() => {
        if (!id) return;
        const galleryRef = dbRef(realtimeDb, `galleries/${id}/photos`);
        const orderRef = dbRef(realtimeDb, `galleries/${id}/order`);

        const unsubscribe = onValue(orderRef, (snapshot) => {
            const order = snapshot.val() as string[];
            if (order) {
                onValue(galleryRef, (snap) => {
                    const data = snap.val();
                    if (data) {
                        const orderedPhotos = order
                            .map(pId => data[pId] ? { id: pId, ...data[pId] } : null)
                            .filter(p => p !== null) as Photo[];
                        setPhotos(orderedPhotos);
                    }
                }, { onlyOnce: true });
            } else {
                onValue(galleryRef, (snap) => {
                    const data = snap.val();
                    if (data) {
                        const unsortedPhotos = Object.entries(data).map(([pId, val]: [string, any]) => ({ id: pId, ...val }));
                        setPhotos(unsortedPhotos);
                    } else {
                        setPhotos([]);
                    }
                }, { onlyOnce: true });
            }
        });

        // Fetch layout setting
        get(dbRef(realtimeDb, `galleries/${id}/layout`)).then(snap => {
            if (snap.exists()) setLayout(snap.val());
        });

        return () => unsubscribe();
    }, [id]);

    const saveOrder = useCallback(async (newPhotos: Photo[]) => {
        if (!id) return;
        const order = newPhotos.map(p => p.id);
        await set(dbRef(realtimeDb, `galleries/${id}/order`), order);
        setPhotos(newPhotos);
    }, [id]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !id) return;

        const fileList = Array.from(files);
        setUploading(true);
        setUploadProgress({ current: 0, total: fileList.length });

        try {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                setUploadProgress(prev => ({ ...prev, current: i + 1 }));

                const fileId = push(dbRef(realtimeDb, `galleries/${id}/photos`)).key;
                if (!fileId) continue;

                const filePath = `galleries/${id}/gallery/${fileId}.jpg`;
                const fileRef = ref(storage, filePath);
                
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);

                // Get image dimensions
                const img = new Image();
                img.src = url;
                await new Promise((resolve) => { img.onload = resolve; });

                await set(dbRef(realtimeDb, `galleries/${id}/photos/${fileId}`), {
                    url,
                    name: file.name,
                    width: img.width,
                    height: img.height
                });

                const orderSnapshot = await get(dbRef(realtimeDb, `galleries/${id}/order`));
                const currentOrder = orderSnapshot.exists() ? (orderSnapshot.val() as string[]) : [];
                await set(dbRef(realtimeDb, `galleries/${id}/order`), [...currentOrder, fileId]);
            }
        } catch (error: any) {
            console.error("Upload failed", error);
            alert(`업로드 실패: ${error.message}`);
        } finally {
            setUploading(false);
            setUploadProgress({ current: 0, total: 0 });
            e.target.value = "";
        }
    };

    const handleDelete = async (photoId: string) => {
        if (!id || !window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            const sRef = ref(storage, `galleries/${id}/gallery/${photoId}.jpg`);
            await deleteObject(sRef).catch(err => console.warn("Storage delete failed", err));
            await remove(dbRef(realtimeDb, `galleries/${id}/photos/${photoId}`));
            const newOrder = photos.filter(p => p.id !== photoId).map(p => p.id);
            await set(dbRef(realtimeDb, `galleries/${id}/order`), newOrder);
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleDeleteAll = async () => {
        if (!id || !window.confirm("모든 사진을 삭제하시겠습니까?")) return;
        try {
            // In a real app, you'd need to loop through and delete each storage item or use a Cloud Function.
            // For simplicity here, we'll just clear the database entries.
            await remove(dbRef(realtimeDb, `galleries/${id}/photos`));
            await remove(dbRef(realtimeDb, `galleries/${id}/order`));
            setPhotos([]);
        } catch (error) {
            console.error("Delete all failed", error);
        }
    };

    const changeLayout = async (newLayout: string) => {
        setLayout(newLayout);
        await set(dbRef(realtimeDb, `galleries/${id}/layout`), newLayout);
    };

    return (
        <Container>
            <HeaderRow>
                <SectionTitle>갤러리 사진 입력</SectionTitle>
                <UploadBtn htmlFor="gallery-upload">+ 사진 추가</UploadBtn>
                <input id="gallery-upload" type="file" multiple accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
            </HeaderRow>

            <StatsRow>
                <span>갤러리 사진({photos.length}/60장)</span>
                <ActionGroup>
                    {/* <ActionButton>순서 변경</ActionButton> */}
                    <ActionButton onClick={handleDeleteAll} style={{ color: "#ff4d4d" }}>전체 삭제</ActionButton>
                </ActionGroup>
            </StatsRow>

            {uploading && (
                <ProgressContainer>
                    <ProgressBar width={(uploadProgress.current / uploadProgress.total) * 100} />
                    <ProgressText>업로드 중... ({uploadProgress.current}/{uploadProgress.total})</ProgressText>
                </ProgressContainer>
            )}

            <PhotoGridWrapper>
                <Reorder.Group axis="y" values={photos} onReorder={saveOrder} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", listStyle: "none", padding: 0 }}>
                    <AnimatePresence>
                        {photos.map((photo) => (
                            <Reorder.Item key={photo.id} value={photo} style={{ position: "relative" }}>
                                <PhotoItem>
                                    <PhotoThumb src={photo.url} alt={photo.name} />
                                    <DeleteOverlay onClick={() => handleDelete(photo.id)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </DeleteOverlay>
                                </PhotoItem>
                            </Reorder.Item>
                        ))}
                    </AnimatePresence>
                </Reorder.Group>
            </PhotoGridWrapper>

            <LayoutSection>
                <SectionTitleSmall>갤러리 레이아웃</SectionTitleSmall>
                <LayoutOptions>
                    <LayoutCard active={layout === "slide"} onClick={() => changeLayout("slide")}>
                        <IconPlaceholder />
                        <span>기본 슬라이드</span>
                    </LayoutCard>
                    <LayoutCard active={layout === "grid"} onClick={() => changeLayout("grid")}>
                        <IconPlaceholder grid />
                        <span>3x3 그리드</span>
                    </LayoutCard>
                    <LayoutCard active={layout === "scroll"} onClick={() => changeLayout("scroll")}>
                        <IconPlaceholder scroll />
                        <span>스크롤 보기</span>
                    </LayoutCard>
                </LayoutOptions>
            </LayoutSection>
        </Container>
    );
};

export default GallerySetting;

const Container = styled.div`
    padding: 24px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
`;

const UploadBtn = styled.label`
    background: #ff6b9d;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
`;

const StatsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
`;

const ActionGroup = styled.div`
    display: flex;
    gap: 12px;
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 4px;
    &:hover { opacity: 0.7; }
`;

const ProgressContainer = styled.div`
    margin-bottom: 20px;
`;

const ProgressBar = styled.div<{ width: number }>`
    height: 8px;
    background: #ff6b9d;
    width: ${props => props.width}%;
    border-radius: 4px;
    transition: width 0.3s;
`;

const ProgressText = styled.div`
    font-size: 12px;
    color: #ff6b9d;
    text-align: right;
    margin-top: 4px;
`;

const PhotoGridWrapper = styled.div`
    margin-bottom: 32px;
`;

const PhotoItem = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background: #f0f0f0;
    cursor: grab;
    &:active { cursor: grabbing; }
`;

const PhotoThumb = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const DeleteOverlay = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 77, 77, 0.8);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
    ${PhotoItem}:hover & { opacity: 1; }
`;

const LayoutSection = styled.div`
    border-top: 1px solid #eee;
    padding-top: 24px;
`;

const SectionTitleSmall = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const LayoutOptions = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
`;

const LayoutCard = styled.div<{ active?: boolean }>`
    border: 1px solid ${props => props.active ? "#ff6b9d" : "#eee"};
    background: ${props => props.active ? "#fffaff" : "#fff"};
    padding: 16px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;
    span { font-size: 12px; color: ${props => props.active ? "#ff6b9d" : "#666"}; }
    &:hover { border-color: #ff6b9d; }
`;

const IconPlaceholder = styled.div<{ grid?: boolean; scroll?: boolean }>`
    width: 40px;
    height: 30px;
    background: #eee;
    border-radius: 4px;
    position: relative;
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 15px;
        border: 2px solid #ccc;
        ${props => props.grid && "border-style: double;"}
    }
`;
