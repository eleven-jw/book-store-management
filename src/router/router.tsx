import { createBrowserRouter } from "react-router-dom";
import React from "react";

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
    element: <InventoryList />,
  },
  {
    path: "/orders",
    element: <OrderList />,
  },
  
]);

export default router;
