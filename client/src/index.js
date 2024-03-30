import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewNode from "./views/NewNode/NewNode";
import Home from "./views/Home/Home";
import toast, { Toaster } from "react-hot-toast";
import UpdateNote from "./views/updateNote/UpdateNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/newnote",
    element: <NewNode />,
  },
  {
    path: "/update/:id",
    element: <UpdateNote/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);
