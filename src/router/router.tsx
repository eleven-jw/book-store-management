import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { FileOutlined, TeamOutlined } from "@ant-design/icons";
import type { RouteObjectWithMeta } from "../type";

const Login = React.lazy(() => import("../views/Login"));
const InventoryList = React.lazy(() => import("../views/InventoryList"));
const OrderList = React.lazy(() => import("../views/OrderList"));

const routes : RouteObjectWithMeta[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    // meta: {
    //   title: "Home", // 添加根路由的标题（关键！）
    // },
    children: [
      {
        index: true, // 匹配根路径 `/`
        element: <Navigate to="/inventory" replace />,
      },
      {
        path: "inventory",
        element: <InventoryList />,
        meta: {
          title: "Inventory Management",
          icon: <FileOutlined />,
        },
      },
      {
        path: "orders",
        element: <OrderList />,
        meta: {
          title: "Order Management",
          icon: <TeamOutlined />,
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
