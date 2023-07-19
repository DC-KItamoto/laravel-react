import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token ,setUser,setToken} = useStateContext();
    //tokenが存在しない場合ログイン画面にリダイレクトさせる
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
            setUser(data)
        })
    },[])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>herader</div>
                    <div>
                        {user.name}
                        <a
                            href="#"
                            className="btn-logout"
                            onClick={onLogout}
                        >Logout</a>
                    </div>
                </header>
                <main>
                    default
                    {/*<Outlet />は router.jsxで書いたchildrenの要素を取得できる */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
