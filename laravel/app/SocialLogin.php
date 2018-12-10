<?php
namespace App;
use Exception;
use Socialite;

class SocialLogin
{
    public function authenticate($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function login($provider)
    {
        $socialUserInfo = Socialite::driver($provider)->stateless()->user();
        return $socialUserInfo;
    }
}