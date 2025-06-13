<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = Testimonial::all();

        return response()->json($testimonials, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'status' => 'required|in:pendente,aprovado',
        ]);

        $imageUrl = null;

        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                if (!$file->isValid()) {
                    return response()->json([
                        'error' => 'Arquivo de imagem inválido'
                    ], 422);
                }

                $response = Http::withHeaders([
                    'pinata_api_key' => env('PINATA_API_KEY'),
                    'pinata_secret_api_key' => env('PINATA_API_SECRET')
                ])->attach(
                    'file',
                    file_get_contents($file->getRealPath()),
                    $file->getClientOriginalName()
                )->post('https://api.pinata.cloud/pinning/pinFileToIPFS', [
                    'pinataMetadata' => json_encode([
                        'name' => 'testimonials/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao subir imagem de depoimento', [
                        'status' => $response->status(),
                        'response' => $response->json()
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Exceção ao enviar imagem para o Pinata', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        $testimonialData = [
            'name' => $validated['name'],
            'company' => $validated['company'],
            'content' => $validated['content'],
            'rating' => $validated['rating'],
            'image' => $imageUrl,
            'status' => $validated['status'],
        ];

        $testimonial = Testimonial::create($testimonialData);

        return response()->json($testimonial, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'company' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'rating' => 'sometimes|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'status' => 'sometimes|in:pendente,aprovado',
        ]);

        $imageUrl = $testimonial->image;

        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                if (!$file->isValid()) {
                    return response()->json([
                        'error' => 'Arquivo de imagem inválido'
                    ], 422);
                }

                $response = Http::withHeaders([
                    'pinata_api_key' => env('PINATA_API_KEY'),
                    'pinata_secret_api_key' => env('PINATA_API_SECRET')
                ])->attach(
                    'file',
                    file_get_contents($file->getRealPath()),
                    $file->getClientOriginalName()
                )->post('https://api.pinata.cloud/pinning/pinFileToIPFS', [
                    'pinataMetadata' => json_encode([
                        'name' => 'testimonials/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao atualizar imagem de depoimento', [
                        'status' => $response->status(),
                        'response' => $response->json()
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Exceção ao enviar imagem para o Pinata', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        $testimonial->update([
            'name' => $validated['name'] ?? $testimonial->name,
            'company' => $validated['company'] ?? $testimonial->company,
            'content' => $validated['content'] ?? $testimonial->content,
            'rating' => $validated['rating'] ?? $testimonial->rating,
            'image' => $imageUrl,
            'status' => $validated['status'] ?? $testimonial->status,
        ]);

        return response()->json($testimonial, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $testimonial = Testimonial::find($id);


        if (!$testimonial) {
            return response()->json(['error' => 'Depoimento não encontrado'], 404);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Depoimento excluído com sucesso'], 200);
    }
}
