import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ref as dbRef, onValue, set } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { realtimeDb, storage } from "@/firebase";

interface MainSettingProps {
    id: string;
}

interface MainData {
    url: string;
    adjustments: {
        brightness: number;
        contrast: number;
        saturation: number;
        grayscale: number;
        temperature: number;
    };
    hideCover: boolean;
}

const MainSetting: React.FC<MainSettingProps> = ({ id }) => {
    const [data, setData] = useState<MainData>({
        url: "",
        adjustments: {
            brightness: 1.0,
            contrast: 1.0,
            saturation: 1.0,
            grayscale: 0.0,
            temperature: 0.0
        },
        hideCover: false
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!id) return;
        const mainRef = dbRef(realtimeDb, `galleries/${id}/main`);
        const unsubscribe = onValue(mainRef, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val());
            }
        });
        return () => unsubscribe();
    }, [id]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !id) return;

        setUploading(true);
        try {
            const filePath = `galleries/${id}/main.jpg`;
            const fileRef = ref(storage, filePath);
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);

            const newData = { ...data, url };
            await set(dbRef(realtimeDb, `galleries/${id}/main`), newData);
            setData(newData);
        } catch (error) {
            console.error("Main upload failed", error);
            alert("업로드 실패");
        } finally {
            setUploading(false);
        }
    };

    const handleAdjustmentChange = async (name: keyof MainData["adjustments"], value: number) => {
        const newData = {
            ...data,
            adjustments: {
                ...data.adjustments,
                [name]: value
            }
        };
        setData(newData);
        await set(dbRef(realtimeDb, `galleries/${id}/main`), newData);
    };

    const handleToggleHideCover = async () => {
        const newData = { ...data, hideCover: !data.hideCover };
        setData(newData);
        await set(dbRef(realtimeDb, `galleries/${id}/main`), newData);
    };

    const resetAdjustments = async () => {
        const defaultAdjustments = {
            brightness: 1.0,
            contrast: 1.0,
            saturation: 1.0,
            grayscale: 0.0,
            temperature: 0.0
        };
        const newData = { ...data, adjustments: defaultAdjustments };
        setData(newData);
        await set(dbRef(realtimeDb, `galleries/${id}/main`), newData);
    };

    return (
        <Container>
            <SectionTitle>커버 이미지 선택</SectionTitle>
            <SubDesc>커버 대표 이미지(최대 1장)</SubDesc>

            <PreviewWrapper>
                <Badge>1</Badge>
                {uploading ? (
                    <LoaderOverlay>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                        </svg>
                        <span>업로드 중...</span>
                    </LoaderOverlay>
                ) : data.url ? (
                    <PreviewImg 
                        src={data.url} 
                        style={{
                            filter: `brightness(${data.adjustments.brightness}) contrast(${data.adjustments.contrast}) saturate(${data.adjustments.saturation}) grayscale(${data.adjustments.grayscale})`
                        }}
                    />
                ) : (
                    <EmptyPreview>사진을 업로드해주세요</EmptyPreview>
                )}
                
                <ActionButtons>
                    <label htmlFor="main-upload">
                        <IconButton title="교체" disabled={uploading}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12l-9-9-9 9M12 3v18" />
                            </svg>
                        </IconButton>
                    </label>
                    <input id="main-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileUpload} disabled={uploading} />
                    
                    <IconButton onClick={resetAdjustments} title="초기화" disabled={uploading}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </IconButton>
                </ActionButtons>
            </PreviewWrapper>

            <AdjustmentSection>
                <AdjustHeader>
                    <span>사진1 이미지 조정</span>
                    <ResetText onClick={resetAdjustments}>초기화</ResetText>
                </AdjustHeader>

                <SliderItem>
                    <LabelRow>
                        <span>밝기(brightness)</span>
                        <span>{data.adjustments.brightness.toFixed(2)}</span>
                    </LabelRow>
                    <Slider 
                        type="range" min="0.5" max="1.5" step="0.01" 
                        value={data.adjustments.brightness} 
                        onChange={(e) => handleAdjustmentChange("brightness", parseFloat(e.target.value))} 
                    />
                </SliderItem>

                <SliderItem>
                    <LabelRow>
                        <span>대조(contrast)</span>
                        <span>{data.adjustments.contrast.toFixed(2)}</span>
                    </LabelRow>
                    <Slider 
                        type="range" min="0.5" max="1.5" step="0.01" 
                        value={data.adjustments.contrast} 
                        onChange={(e) => handleAdjustmentChange("contrast", parseFloat(e.target.value))} 
                    />
                </SliderItem>

                <SliderItem>
                    <LabelRow>
                        <span>채도(Saturation)</span>
                        <span>{data.adjustments.saturation.toFixed(2)}</span>
                    </LabelRow>
                    <Slider 
                        type="range" min="0" max="2" step="0.01" 
                        value={data.adjustments.saturation} 
                        onChange={(e) => handleAdjustmentChange("saturation", parseFloat(e.target.value))} 
                    />
                </SliderItem>

                <SliderItem>
                    <LabelRow>
                        <span>명도(grayscale)</span>
                        <span>{data.adjustments.grayscale.toFixed(2)}</span>
                    </LabelRow>
                    <Slider 
                        type="range" min="0" max="1" step="0.01" 
                        value={data.adjustments.grayscale} 
                        onChange={(e) => handleAdjustmentChange("grayscale", parseFloat(e.target.value))} 
                    />
                </SliderItem>
            </AdjustmentSection>

            <CheckboxRow>
                <input type="checkbox" checked={data.hideCover} onChange={handleToggleHideCover} id="hide-cover" />
                <label htmlFor="hide-cover">커버 보이지 않기</label>
            </CheckboxRow>
            <InfoBox>
                체크 시 초기 5초간 애니메이션이 보이지 않고, 모바일 청첩장의 최상단에 이미지가 바로 보입니다.
            </InfoBox>
        </Container>
    );
};

export default MainSetting;

const Container = styled.div`
    padding: 24px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 24px;
`;

const SubDesc = styled.p`
    font-size: 16px;
    color: #333;
    margin-bottom: 16px;
`;

const PreviewWrapper = styled.div`
    position: relative;
    width: 280px;
    height: 400px;
    background: #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
`;

const PreviewImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const LoaderOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #ff6b9d;
    svg {
        animation: rotate 2s linear infinite;
    }
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

const EmptyPreview = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
`;

const Badge = styled.div`
    position: absolute;
    top: 12px;
    left: 12px;
    background: #000;
    color: #fff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
`;

const ActionButtons = styled.div`
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    gap: 8px;
`;

const IconButton = styled.button`
    background: #fff;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    &:hover { background: #f8f8f8; }
`;

const AdjustmentSection = styled.div`
    margin-bottom: 24px;
`;

const AdjustHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    span { font-weight: bold; font-size: 14px; }
`;

const ResetText = styled.span`
    color: #999;
    cursor: pointer;
    font-size: 12px;
    &:hover { color: #666; }
`;

const SliderItem = styled.div`
    margin-bottom: 16px;
`;

const LabelRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 8px;
    color: #666;
`;

const Slider = styled.input`
    width: 100%;
    accent-color: #ff6b9d;
`;

const CheckboxRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    input { width: 18px; height: 18px; accent-color: #ff6b9d; }
`;

const InfoBox = styled.div`
    background: #fdf2f6;
    padding: 12px;
    border-radius: 8px;
    font-size: 12px;
    color: #ff6b9d;
    line-height: 1.5;
`;
