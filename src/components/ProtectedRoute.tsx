// src/components/ProtectedRoute.tsx
import { useLocation, Navigate } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("token"); // 检查登录状态
  const location = useLocation();
  // 打印 token，确保能够获取到
  console.log("Token:", isLoggedIn);

  // 未登录时跳转到登录页
  // if (!isLoggedIn) {
  //   return (
  //     <Navigate
  //       to="/login"
  //       state={{ from: location.pathname }} // 记录原路径，登录后跳转回来
  //       replace // 替换历史记录，避免回退
  //     />
  //   );
  // }

  return <Layout />;
  // 已登录时，渲染子路由内容
  // return (

  //   <div>
  //     {/* 这里通过 <Outlet /> 来渲染子路由 */}
  //     <Outlet />
  //   </div>
  // );
};

export default ProtectedRoute;
