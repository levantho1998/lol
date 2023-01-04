import React from "react";
import Detail from "./pages/client/Detail";
import Home from "./pages/client/Home";
import Checkout from "./pages/client/Checkout";
import OrderReceived from "./pages/client/OderReceived";
import Orders from "./pages/client/Orders";
import UserProfile from "./pages/client/UserProfile";
import AdminLogin from "./pages/admin/AdminLogin";
import Products from "./pages/admin/Products";
import OrdersAdmin from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Admin from "./pages/admin/Admin";
import Category from "./pages/admin/Category";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/product/:id",
    exact: true,
    main: (match) => <Detail match={match} />,
  },
  {
    path: "/checkout",
    exact: true,
    main: (history) => <Checkout history={history} />,
  },
  {
    path: "/order-received/:id",
    exact: true,
    main: (match) => <OrderReceived match={match} />,
  },
  {
    path: "/order",
    exact: true,
    main: () => <Orders />,
  },
  {
    path: "/profile",
    exact: true,
    main: () => <UserProfile />,
  },
  {
    path: "/admin",
    exact: true,
    main: (match) => <Admin match={match} />,
  },
  {
    path: "/admin/login",
    exact: true,
    main: () => <AdminLogin />,
  },
  {
    path: "/admin/products",
    exact: true,
    main: (match) => <Products match={match} />,
  },
  {
    path: "/admin/orders",
    exact: true,
    main: (match) => <OrdersAdmin match={match} />,
  },
  {
    path: "/admin/customers",
    exact: true,
    main: (match) => <Customers match={match} />,
  },
  {
    path: "/admin/category",
    exact: true,
    main: (match) => <Category match={match} />,
  },
];

export default routes;
