<?php 
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use Mail;

class EmailController extends ApiController { 	
    public function email(Request $request){
        $data = array(
            'saludo' => $request->input('message')
        );
        
        $sent = Mail::send('email', $data , function ($message) use ($request){
            $message->subject($request->input('subject'));
            $message->from('holup@gmail.com', 'holup');
            $message->to($request->input('email'));
        });
        if($sent) dd("something wrong"); //var_dump + exit
        
        return response()->json(['message' => 'Request completed']);
    }
}
