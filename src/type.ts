import type { RouteObject as DefaultRouteObject } from "react-router-dom";

// 扩展默认 RouteObject，添加 meta 字段
export type RouteObjectWithMeta = DefaultRouteObject & {
  path?: string;
  element?: React.ReactNode;
  index?: boolean;
  children?: RouteObjectWithMeta[];
  meta?: {
    title: string; // 菜单名称
    icon?: React.ReactNode; // 菜单图标
    parentPath?: string; // 父路由路径（可选）
  };
};