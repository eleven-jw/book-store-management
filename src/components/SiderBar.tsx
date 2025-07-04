import { Layout, Menu } from 'antd';
import router from '../router/router';
import type { RouteObjectWithMeta } from '../type';
import { generateMenuItems } from './utils/menuUtils'; // 导入菜单生成工具函数
import { useState } from 'react';

const {  Sider } = Layout;
const SiderBar: React.FC = () => {
  const items = generateMenuItems(router.routes as RouteObjectWithMeta[]);
  console.log('Generated Menu Items:', items);
  const [collapsed, setCollapsed] = useState(false);
  
  return (
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
  );
}
export default SiderBar;
