import {createBrowserRouter} from "react-router-dom";
import Layout from "../Pages/Layout";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import AdminTable from "../Pages/AdminTable";
import EmployeesTable from "../Pages/EmployeesTable";
import EditUser from "../Pages/user/EditUser";
import CreateUser from "../Pages/user/CreateUser";
import CreateEmployee from "../Pages/employee/CreateEmployee";
import EditEmployee from "../Pages/employee/EditEmployee";
import AttendanceTable from "../Pages/attendance/AttendanceTable";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <Login/>},
            {path: "/home", element: <Home/>},
            {path: "/user", element: <AdminTable/>},
            {path: "/user/create", element: <CreateUser/>}, // Add this route
            {path: "/user/edit", element: <EditUser/>}, // Add this route
            {path: "/employee/create", element: <CreateEmployee/>}, // Add this route
            {path: "/employee/edit", element: <EditEmployee/>}, // Add this route
            {path: "/employees", element: <EmployeesTable/>},
            {path: "/attendance", element: <AttendanceTable/>},


        ],
    },
]);

export default router;
