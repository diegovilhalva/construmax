<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects  = Project::all();
        return response()->json($projects);
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
            'status' => 'required|string',
            'progress' => 'required|integer|min:0|max:100',
            'location' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
            'area' => 'required|string',
            'investment' => 'required|string',
            'category' => 'required|string',
            'completed' => 'required|boolean',
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
                        'name' => 'projects/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao subir imagem de projeto', [
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

        $projectData = [
            'title' => $validated['title'],
            'status' => $validated['status'],
            'progress' => $validated['progress'],
            'location' => $validated['location'],
            'description' => $validated['description'] ?? null,
            'image' => $imageUrl,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'area' => $validated['area'],
            'investment' => $validated['investment'],
            'category' => $validated['category'],
            'completed' => $validated['completed'],
        ];

        $project = Project::create($projectData);

        return response()->json($project, 201);
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
    public function update(Request $request, string $id)
    {
        
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['error' => 'Projeto não encontrado'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required|string',
            'progress' => 'required|integer|min:0|max:100',
            'location' => 'required|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
            'area' => 'required|string',
            'investment' => 'required|string',
            'category' => 'required|string',
            'completed' => 'required|in:0,1',
        ]);

        $imageUrl = $project->image;

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
                        'name' => 'projects/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao atualizar imagem do projeto', [
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

        $project->update([
            'title' => $validated['title'],
            'status' => $validated['status'],
            'progress' => $validated['progress'],
            'location' => $validated['location'],
            'description' => $validated['description'] ?? null,
            'image' => $imageUrl,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'area' => $validated['area'],
            'investment' => $validated['investment'],
            'category' => $validated['category'],
            'completed' => $validated['completed'],
        ]);

        return response()->json($project, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['error' => 'Projeto não encontrado'], 404);
        }

        $project->delete();

        return response()->json(['message' => 'Projeto excluído com sucesso'], 200);
    }
}
