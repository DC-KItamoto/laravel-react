<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //php artisan make:request SignupRequestでrequestを作成
    // 新規ユーザー登録のメソッド
    public function signup(SignupRequest $request){
        // リクエストデータをバリデーションします
        $data = $request->validated();
        // 新たなユーザーを作成します
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        // ユーザーにトークンを作成します
        $token = $user->createToken('main')->plainTextToken;
        // ユーザー情報とトークンをレスポンスとして返します
        return response(compact('user', 'token'));
    }
    
    //php artisan make:request LoginRequestでrequestを作成
    // ユーザーログインのメソッド
    public function login(LoginRequest $request){
        // リクエストデータをバリデーションします
        $credentials = $request->validated();
        // 認証を試みます
        if(!Auth::attempt($credentials)){
            // 認証に失敗したらエラーメッセージを返します
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }

        // ログイン中のユーザー情報を取得します
        $user = Auth::user();
        // ユーザーに新たなトークンを作成します
        $token = $user->createToken('main')->plainTextToken;
        // ユーザー情報とトークンをレスポンスとして返します
        return response(compact('user', 'token'));
    }

    // ユーザーログアウトのメソッド
    public function logout(Request $request){
        // ログイン中のユーザー情報を取得します
        $user = $request->user();
        // ユーザーのトークンを削除します（ログアウトします）
        $token = $user->currentAccessToken()->delete();
        // レスポンスコード204（成功）を返しますが、内容は空です
        return response('', 204);
    }
}
