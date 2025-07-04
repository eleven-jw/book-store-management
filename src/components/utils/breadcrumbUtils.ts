import { useLocation } from "react-router-dom";
import router from "../../router/router";
import type { RouteObjectWithMeta } from "../../type";

// 用于递归查找匹配的路由
const findRouteMeta = (path: string, routeArray: RouteObjectWithMeta[]): RouteObjectWithMeta | null => {
    console.log('findRouteMeta', path, routeArray);
  for (const route of routeArray) {
    // 如果路径匹配
    if (route.path === path) {
      return route;
    }

    // 如果有子路由，递归查找
    if (route.children) {
      const childRoute = findRouteMeta(path, route.children);
      if (childRoute) {
        return childRoute;
      }
    }
  }
  return null;
};

// 自定义 Hook 用于根据当前的路径获取面包屑
export const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // 获取当前路径分割的路径段

  const breadcrumbs = []; // 面包屑数组
  let currentPath = ""; // 当前路径

  pathnames.forEach((segment, index) => {
    currentPath = `/${pathnames.slice(0, index + 1).join('/')}`; // 拼接路径
    const routeMeta = findRouteMeta(currentPath, router.routes); // 查找对应的路由 meta 数据

    if (routeMeta && routeMeta.meta && routeMeta.meta.title) {
      breadcrumbs.push({
        title: routeMeta.meta.title, // 获取 title
        path: currentPath, // 获取完整路径
        icon: routeMeta.meta.icon // 获取 icon
      });
    }
  });

  console.log('useBreadcrumbs', breadcrumbs);
  return breadcrumbs; // 返回面包屑数据
};
