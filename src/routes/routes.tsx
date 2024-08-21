import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerators } from "../utils/routesGenerators";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
    },
    {
        path: '/admin',
        element: <App></App>,
        children: routeGenerators(adminPaths)
    },
    {
        path: '/faculty',
        element: <App></App>,
        children: routeGenerators(facultyPaths)
    },
    {
        path: '/student',
        element: <App></App>,
        children: routeGenerators(studentPaths)
    },

    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },

])


export default router;