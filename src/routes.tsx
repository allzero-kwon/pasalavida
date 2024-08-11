import React from "react";
import Layout from "./pages/_layout";

const DynamicIndex = React.lazy(() => import("./pages/index"));

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <DynamicIndex />, index: true }],
  },
];

export const pages = [{ routes: "/" }];
