import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoutes from "./routes/protectedRoutes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path: "/register",
        element: <Registration/>
    },
    {
        path: "/dashboard",
        element: <ProtectedRoutes/>,
        children :[
            {
                path: "",
                element: <Dashboard/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default router