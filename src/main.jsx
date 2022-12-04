import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Plantilla from './components/Plantilla';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Plantilla />
  },
  {
    path: "about",
    element: <div>About</div>,
  },
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
