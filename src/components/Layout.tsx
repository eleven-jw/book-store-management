// src/App.tsx
import React from 'react';
import { Layout, theme } from 'antd';
import { useLocation, Outlet } from 'react-router-dom'; // 新增路由相关导入
import type { RouteObjectWithMeta } from '../type';
import router from '../router/router';

import { generateMenuItems } from './utils/menuUtils'; // 导入菜单生成工具函数
import SiderBar from './SiderBar';
import Breadcrumb from './Breadcrumb'; // 导入面包屑组件
const { Header, Content, Footer } = Layout;

const LayoutComponent: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = generateMenuItems(router.routes as RouteObjectWithMeta[]);
  console.log('Generated Menu Items:', items);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <SiderBar></SiderBar>
      {/* 主布局 */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          {/* 面包屑导航 */}
          <Breadcrumb /> 
          
          {/* 内容区域：渲染子路由组件 */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet /> {/* 关键：子路由内容在此渲染 */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;