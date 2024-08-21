import { Layout, theme } from 'antd';

import { Button } from 'antd/es/radio';
import { Outlet } from 'react-router-dom';
import { logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import Sidebar from './Sidebar';


const { Header, Content, Footer, } = Layout;


const MainLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const dispatch = useAppDispatch();

    const handleLogOut = () => {

        dispatch(logOut())

    }


    return (
        <div>
            <Layout style={{ height: '100%' }}>
                <Sidebar></Sidebar>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} >
                        <Button onClick={handleLogOut} >LogOut</Button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                               
                            }}
                        >
                            <Outlet></Outlet>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </div>
    );
};

export default MainLayout;