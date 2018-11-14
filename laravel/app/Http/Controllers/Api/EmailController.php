<?php 
namespace App\Http\Controllers\Api;
use App\Http\Requests\Api\Contact;
use Mail;

class EmailController extends ApiController { 	
    public function email( Contact $request ){
        $data = array(
            'subject' => $request->input('contactMail.subject'),
            'name' => $request->input('contactMail.name'),
            'email' => $request->input('contactMail.email'),
            'text' => $request->input('contactMail.message')
        );
        
        $sent = Mail::send('email', $data , function ($message) use ($request){
            $message->subject($request->input('contactMail.subject'));
            $message->from('holup@gmail.com', 'holup');
            $message->to($request->input('contactMail.email'));
        });
        $sent = Mail::send('email', $data , function ($message) use ($request){
            $message->subject($request->input('contactMail.subject'));
            $message->from('holup@gmail.com', 'holup');
            $message->to("daniortizgar@gmail.com");
        });
        if($sent) dd("something wrong"); //var_dump + exit
        
        return response()->json(['message' => 'The mail was send correctly']);
    }
}
