import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, Result } from 'antd'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Home';
import Login from './Login';

import './_main.scss';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <Result
    status="404"
    title="404"
    subTitle="Lo siento, esta pagina no existe."/>
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/compras",
    element: <Home />
  },
  {
    path: "/ventas",
    element: <Home />
  },
  {
    path: "/inventario",
    element: <Home />
  },
  {
    path: "/historico",
    element: <Home />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          borderRadius: '0px',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)
