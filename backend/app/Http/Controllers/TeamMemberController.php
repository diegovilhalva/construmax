<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TeamMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = TeamMember::all();
        return response()->json($members, 200);
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
            'position' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'bio' => 'required|string',
            'linkedin' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
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
                        'name' => 'team-members/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao subir imagem de membro da equipe', [
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

        $memberData = [
            'name' => $validated['name'],
            'position' => $validated['position'],
            'department' => $validated['department'] ?? null,
            'bio' => $validated['bio'],
            'linkedin' => $validated['linkedin'] ?? null,
            'image' => $imageUrl,
        ];

        $member = TeamMember::create($memberData);

        return response()->json($member, 201);
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
    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'bio' => 'required|string',
            'linkedin' => 'nullable|url|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        $imageUrl = $teamMember->image;

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
                        'name' => 'team-members/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao subir imagem de membro da equipe', [
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

        $teamMember->update([
            'name' => $validated['name'],
            'position' => $validated['position'],
            'department' => $validated['department'] ?? null,
            'bio' => $validated['bio'],
            'linkedin' => $validated['linkedin'] ?? null,
            'image' => $imageUrl,
        ]);

        return response()->json($teamMember);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeamMember $teamMember)
    {
        try {
            $teamMember->delete();
            
            return response()->json([
                'message' => 'Membro da equipe excluído com sucesso!'
            ], 200);
            
        } catch (\Exception $e) {
            Log::error('Erro ao excluir membro da equipe', [
                'id' => $teamMember->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Erro ao excluir membro da equipe. Tente novamente mais tarde.'
            ], 500);
        }
    }
}
