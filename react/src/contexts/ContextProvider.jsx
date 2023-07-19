import { createContext, useContext, useState } from "react";

//新しいContext(情報を持つ係）作成
//contextはアプリケーション全体で共有するためのデータを持つことができる
//コンテキストオブジェクト
const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

//contextの値を子コンポーネントに渡す
//Providerコンポーネントは、propsとしてvalueを受け取る
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    //localStorageからアクセストークンを取得して初期値にする
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    //tokenを更新するための関数
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            //token更新すると新たにセットする
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            //tokenが無効になった場合tokenを削除
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            //子コンポーネントで利用できる値を返してる
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
//useContext()でコンポーネントからContext値を読み取り
export const useStateContext = () => useContext(StateContext);
