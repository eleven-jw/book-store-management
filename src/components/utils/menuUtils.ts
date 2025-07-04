// src/utils/menuUtils.ts
import type { RouteObjectWithMeta } from "../../type";
import type { MenuProps } from "antd";

// 从路由配置中提取元数据并生成菜单项
export const generateMenuItems = (routes: RouteObjectWithMeta[]): MenuProps['items'] => {
    console.log('Generating menu items from routes:', routes);
    // console.log('meta', routes.filter((route) => route.meta));
    return routes.flatMap((route) => {
    // 如果当前路由有 meta，生成菜单项
    if (route?.meta) {
      const menuItem: MenuProps['items'][number] = {
        key: route.path as string, // 路由路径作为唯一标识
        icon: route?.meta.icon, // 菜单图标（Ant Design 图标）
        label: route?.meta.title, // 菜单名称
        // 递归处理子路由（如果有）
        children: route?.children ? generateMenuItems(route.children) : undefined,
      };
      return [menuItem];
    }

    // 如果当前路由无 meta，但包含子路由，递归处理子路由
    if (route.children) {
      return generateMenuItems(route.children);
    }

    // 无 meta 且无子路由，返回空数组
    return [];
  });

//   return routes
//     .filter((route) => route.meta) // 过滤无元数据的路由（如登录页）
//     .map((route) => {
//       const { path, meta, children } = route;
//       const menuItem = {
//         key: path as string, // 菜单唯一标识（路由路径）
//         icon: meta?.icon, // 菜单图标
//         label: meta?.title, // 菜单名称
//         children: children ? generateMenuItems(children) : undefined, // 递归生成子菜单
//       };
//       return menuItem;
//     });
};