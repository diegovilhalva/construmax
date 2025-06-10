<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceFeature;
use App\Models\ServiceProcessStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'detailed_description' => 'nullable|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'process' => 'nullable|array',
            'process.*.step' => 'required|integer',
            'process.*.title' => 'required|string',
            'process.*.description' => 'required|string',
            'image' => 'nullable|image|max:4096',
        ]);

        $imageUrl = null;

        if ($request->hasFile('image')) {

            $response = Http::withToken(env('PINATA_JWT'))
                ->attach(
                    'file',
                    fopen($request->file('image')->getPathname(), 'r'),
                    $request->file('image')->getClientOriginalName()
                )
                ->withHeaders([
                    'Content-Type' => 'multipart/form-data'
                ])
                ->post('https://api.pinata.cloud/pinning/pinFileToIPFS', [
                    [
                        'name' => 'pinataMetadata',
                        'contents' => json_encode([
                            'name' => 'services/' . time() . '-' . $request->file('image')->getClientOriginalName()
                        ])
                    ]
                ]);


            if ($response->successful()) {
                $ipfsHash = $response['IpfsHash'];
                $imageUrl = "https://gateway.pinata.cloud/ipfs/{$ipfsHash}";
            } else {
                return response()->json(['error' => 'Erro ao enviar imagem para o Pinata'], 500);
            }
        }


        $service = Service::create([
            'title' => $request->title,
            'description' => $request->description,
            'detailed_description' => $request->detailed_description,
            'image' => $imageUrl,
        ]);

        // Criar features relacionadas
        if ($request->has('features')) {
            foreach ($request->features as $feature) {
                $service->features()->create([
                    'feature' => $feature
                ]);
            }
        }

        // Criar steps relacionados
        if ($request->has('process')) {
            foreach ($request->process as $step) {
                $service->processSteps()->create([
                    'step' => $step['step'],
                    'title' => $step['title'],
                    'description' => $step['description'],
                ]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
