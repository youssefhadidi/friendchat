import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import ErrorPage from './routes/errorPage';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root children={<App/>}/>,
    errorElement: <ErrorPage/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


