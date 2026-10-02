import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import MainSetting from "./MainSetting";
import GallerySetting from "./GallerySetting";

const AdminPage = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState("gallery");

    const menuItems = [
        { id: "remind", label: "리마인드", icon: "🔔" },
        { id: "basic", label: "기본정보", icon: "📄" },
        { id: "wedding", label: "예식정보", icon: "🗓️" },
        { id: "location", label: "오시는 길", icon: "🗺️" },
        { id: "main", label: "커버", icon: "🖼️" },
        { id: "gallery", label: "갤러리", icon: "📱" },
        { id: "account", label: "계좌정보", icon: "💳" },
        { id: "info", label: "안내사항", icon: "ℹ️" },
        { id: "guestbook", label: "방명록", icon: "✏️" },
    ];

    if (!id) return <div>ID가 필요합니다.</div>;

    const renderContent = () => {
        switch (activeTab) {
            case "main":
                return <MainSetting id={id} />;
            case "gallery":
                return <GallerySetting id={id} />;
            default:
                return (
                    <ComingSoon>
                        <h2>{menuItems.find(m => m.id === activeTab)?.label} 설정</h2>
                        <p>이 기능은 곧 추가될 예정입니다.</p>
                    </ComingSoon>
                );
        }
    };

    return (
        <PageWrapper>
            <Header>
                <Logo>Bonneyajou</Logo>
                <HeaderActions>
                    <HeaderBtn secondary>혜택 보기</HeaderBtn>
                    <HeaderBtn>저장하기</HeaderBtn>
                </HeaderActions>
            </Header>

            <MainContainer>
                <Sidebar>
                    {menuItems.map((item) => (
                        <NavItem 
                            key={item.id} 
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <Icon>{item.icon}</Icon>
                            <Label>{item.label}</Label>
                        </NavItem>
                    ))}
                    <AddButton>+</AddButton>
                </Sidebar>

                <ContentArea>
                    {renderContent()}
                </ContentArea>
            </MainContainer>
        </PageWrapper>
    );
};

export default AdminPage;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f7fa;
    font-family: 'AritaDotumKR', sans-serif;
`;

const Header = styled.header`
    height: 64px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    z-index: 10;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    color: #333;
`;

const HeaderActions = styled.div`
    display: flex;
    gap: 12px;
`;

const HeaderBtn = styled.button<{ secondary?: boolean }>`
    padding: 8px 20px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    border: none;
    background: ${props => props.secondary ? "#f0f0f0" : "#ff6b9d"};
    color: ${props => props.secondary ? "#333" : "#fff"};
    display: flex;
    align-items: center;
    gap: 6px;
    &:hover { opacity: 0.9; }
`;

const MainContainer = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
`;

const Sidebar = styled.aside`
    width: 100px;
    background: #fff;
    border-right: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    overflow-y: auto;
`;

const NavItem = styled.div<{ active?: boolean }>`
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    border-radius: 12px;
    margin-bottom: 8px;
    transition: all 0.2s;
    background: ${props => props.active ? "#fff0f5" : "transparent"};
    color: ${props => props.active ? "#ff6b9d" : "#999"};
    &:hover { background: #fafafa; }
`;

const Icon = styled.div`
    font-size: 24px;
`;

const Label = styled.span`
    font-size: 12px;
    font-weight: 500;
`;

const AddButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #ff6b9d;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(255, 107, 157, 0.3);
`;

const ContentArea = styled.main`
    flex: 1;
    padding: 40px;
    overflow-y: auto;
`;

const ComingSoon = styled.div`
    background: #fff;
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    h2 { margin-bottom: 12px; }
    p { color: #666; }
`;

