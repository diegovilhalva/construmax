<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceFeature;
use App\Models\ServiceProcessStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::with(['features', 'processSteps'])->orderBy('created_at', 'desc')->get();

        return response()->json($services);
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'detailed_description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'process' => 'nullable|array',
            'process.*.step' => 'sometimes|integer',
            'process.*.title' => 'sometimes|string',
            'process.*.description' => 'sometimes|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096', // Adicione webp
        ]);

        $imageUrl = null;

        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                // Validação adicional do arquivo
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
                        'name' => 'services/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata', [
                        'status' => $response->status(),
                        'response' => $response->json()
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Exceção Pinata', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        $serviceData = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'detailed_description' => $validated['detailed_description'] ?? null,
            'image' => $imageUrl,
        ];

        $service = Service::create($serviceData);

        // Criar features se existirem
        if (!empty($validated['features'])) {
            foreach ($validated['features'] as $feature) {
                if (!empty(trim($feature))) {
                    $service->features()->create(['feature' => $feature]);
                }
            }
        }

        // Criar steps se existirem
        if (!empty($validated['process'])) {
            foreach ($validated['process'] as $step) {
                if (!empty($step['title']) && !empty($step['description'])) {
                    $service->processSteps()->create([
                        'step' => $step['step'] ?? 1,
                        'title' => $step['title'],
                        'description' => $step['description'],
                    ]);
                }
            }
        }

        return response()->json($service->load(['features', 'processSteps']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'detailed_description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'process' => 'nullable|array',
            'process.*.step' => 'sometimes|integer',
            'process.*.title' => 'sometimes|string',
            'process.*.description' => 'sometimes|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        $imageUrl = $service->image;

        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                if (!$file->isValid()) {
                    return response()->json(['error' => 'Arquivo de imagem inválido'], 422);
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
                        'name' => 'services/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro ao fazer upload para Pinata', [
                        'status' => $response->status(),
                        'response' => $response->json()
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar imagem com Pinata', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        // Atualizar dados principais do serviço
        $service->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'detailed_description' => $validated['detailed_description'] ?? null,
            'image' => $imageUrl,
        ]);

        // Atualizar features
        $service->features()->delete();
        if (!empty($validated['features'])) {
            foreach ($validated['features'] as $feature) {
                if (!empty(trim($feature))) {
                    $service->features()->create(['feature' => $feature]);
                }
            }
        }

        // Atualizar steps
        $service->processSteps()->delete();
        if (!empty($validated['process'])) {
            foreach ($validated['process'] as $step) {
                if (!empty($step['title']) && !empty($step['description'])) {
                    $service->processSteps()->create([
                        'step' => $step['step'] ?? 1,
                        'title' => $step['title'],
                        'description' => $step['description'],
                    ]);
                }
            }
        }

        return response()->json($service->load(['features', 'processSteps']), 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        try {
            $service->delete();

            return response()->json(['message' => 'Serviço deletado com sucesso.'], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao deletar serviço', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json(['error' => 'Erro ao deletar serviço.'], 500);
        }
    }
}
