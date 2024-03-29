import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import NewNode from './views/NewNode/NewNode';
import Home from './views/Home/Home';


const router= createBrowserRouter([
  {
    path:"/",
    element: <Home/>
  },
  {
    path:"/newnote",
    element: <NewNode/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

