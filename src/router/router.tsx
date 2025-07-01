import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const Login = React.lazy(() => import("../views/Login"));
const InventoryList = React.lazy(() => import("../views/InventoryList"));
const OrderList = React.lazy(() => import("../views/OrderList"));

const router = createBrowserRouter([
{
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // 先通过路由守卫检查登录状态
    children: [
      {
        index: true, // 匹配根路径 `/`
        element: <Navigate to="/inventory" replace />, // 默认跳转到 InventoryList
      },
      {
        path: "inventory",
        element: <InventoryList />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
    ],
  },
//   {
//     path: "/",
//     element: <InventoryList />,
//   },
//   {
//     path: "/orders",
//     element: <OrderList />,
//   },
  
]);

export default router;
