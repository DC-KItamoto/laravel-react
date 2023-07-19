import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
    //サイトにログインしたときのデフォルトページへルート
    {
        path: "/",
        //親コンポーネント
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                //子コンポーネント＆＆リダイレクト
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                //子コンポーネント
                element: <Users />,
            },
            {
                path: "/dashboard",
                //子コンポーネント
                element: <Dashboard />,
            },
            {
                path: "/users/new",
                //子コンポーネント
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                //子コンポーネント
                element: <UserForm key="userUpdate" />,
            },
        ],
    },
    //サインインまたはログイン前のページにいるときのデフォルトルート
    {
        path: "/",
        //親コンポーネント
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                //子コンポーネント
                element: <Login />,
            },
            {
                path: "/signup",
                //子コンポーネント
                element: <Signup />,
            },
        ],
    },
    //予期せぬエラーが出たときのノットファウンドへのルート
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
