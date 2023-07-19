// 必要なモジュールをインポート
import { createRef, useState } from "react"; // Reactのフックで、値を保持するための参照を作成
import { Link } from "react-router-dom"; // アプリケーション内でのナビゲーションを可能にするReact Routerのコンポーネント
import axiosClient from "../axios-client"; // サーバーにHTTPリクエストを送信するためのaxiosのインスタンス
import { useStateContext } from "../contexts/ContextProvider"; // アプリケーション全体で状態を参照・変更するためのフック

export default function Signup() {
    // 各入力フィールドへの参照を作成
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfigmationRef = createRef();
    const [errors, setErrors] = useState(null);
    // setUserとsetTokenはコンテキストから取得した関数で、ユーザー情報とトークンを更新する
    const { setUser, setToken } = useStateContext();
    const onSubmit = (ev) => {
        //preventDefault()はまだ明示的な処理が決まってないとに使う。今後正しい処理を書く
        ev.preventDefault(); // フォーム送信のデフォルトの動作を防ぐ
        //formで入力された値を取得
        // payloadは入力フィールドから収集した情報を含んだオブジェクト
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfigmationRef.current.value,
        };
        // '/signup'エンドポイントにPOSTリクエストを送り、新規登録を行う
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                // レスポンスにより、ユーザー情報とトークンを更新する
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                // レスポンスが422（バリデーションエラー）の場合、エラーメッセージをコンソールに出力
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {/* user登録情報 */}
                <form onSubmit={onSubmit} action="">
                    <h1 className="title">Signup for free</h1>
                    {/* バリデーションエラーが出たときの処理 */}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                // errorは配列で出力されるから配列で取得する
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfigmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">Signup</button>
                </form>
                <p className="message">
                    Already Regisstered?
                    <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
