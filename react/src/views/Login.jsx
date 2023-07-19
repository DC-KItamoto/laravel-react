import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const [errors, setErrors] = useState(null);
    // setUserとsetTokenはコンテキストから取得した関数で、ユーザー情報とトークンを更新する
    const { setUser, setToken } = useStateContext();
    const onSubmit = (ev) => {
        //preventDefault()はまだ明示的な処理が決まってないとに使う。今後正しい処理を書く
        ev.preventDefault(); // フォーム送信のデフォルトの動作を防ぐ
        //formで入力された値を取得
        // payloadは入力フィールドから収集した情報を含んだオブジェクト
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);
        // '/signup'エンドポイントにPOSTリクエストを送り、新規登録を行う
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                // レスポンスにより、ユーザー情報とトークンを更新する
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                // レスポンスが422（バリデーションエラー）の場合、エラーメッセージをコンソールに出力
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit} action="">
                    <h1 className="title">Login into your account</h1>
                    {/* バリデーションエラーが出たときの処理 */}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                // errorは配列で出力されるから配列で取得する
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                    />
                    <button className="btn btn-block">Login</button>
                </form>
                <p className="message">
                    Not Regisstered?
                    <Link to="/signup">Create an account</Link>
                </p>
            </div>
        </div>
    );
}
