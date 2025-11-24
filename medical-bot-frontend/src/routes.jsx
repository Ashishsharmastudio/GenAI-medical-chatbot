import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminUpload from "./pages/AdminUpload";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/chat", element: <Chat /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/admin/upload", element: <AdminUpload /> },
]);
