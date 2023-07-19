<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */

    //user登録時のバリデーション
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:55',
            //unique:テーブル名,カラム名
            'email' => 'required|email|unique:users,email',
            'password'=>[
                'required',
                //Laravelのバリデーションルールの中にはconfirmedというルールがあります。これは、特定のフィールド（この場合はpasswordフィールド）の値が、同じ名前に_confirmationを追加したフィールド（この場合はpassword_confirmationフィールド）の値と一致していることを要求します。
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
            ]
        ];
    }
}
