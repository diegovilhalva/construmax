<?php
// app/Http/Controllers/ContactController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'phone'   => 'required|string|max:20',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        // Aqui você pode enviar um e-mail, salvar no banco, ou ambos
        Mail::to('contato@construmax.com.br')->send(new \App\Mail\ContactMail($validated));

        return response()->json(['message' => 'Mensagem enviada com sucesso!']);
    }
}

