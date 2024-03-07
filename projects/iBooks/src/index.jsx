import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./assets/css/bootstrap.default.css";
import "./assets/css/style.css";
import Root from "./routes/Root.jsx";
import BookDetail from "./routes/BookDetail.jsx";
import AddBook from "./routes/AddBook.jsx";
import BooksList from "./routes/BooksList.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Store from "./model/Store.js";
import NotFound from "./routes/NotFound.jsx";
import NoBookDetail from "./routes/NoBookDetail.jsx";

/**
 * React entry component with router specification
 */

/**
 * Array of Route-Objects with nested routes on the 'children'
 * @type {object[]}
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      
      {
        path: "/",
        element: <Navigate to="addBooks" replace={true} />,
      },
      {
        path: "addBooks",
        element: <AddBook />,
      },
      {
        path: "books",
        element: <BooksList />,
      },
      {
        path: "details",
        element: <NoBookDetail />,
      },
      {
        path: "details/:isbn",
        element: <BookDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);


// One-time connection to Firestore database
Store.connectDataBase()

/**
 * main root for React
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
