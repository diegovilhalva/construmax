<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class BlogPostController extends Controller
{
    /**
     * Listar todos os posts com paginação e pesquisa
     */
    public function index(Request $request)
    {
        try {
            $query = BlogPost::with('author')
                ->orderBy('created_at', 'desc');

            // Pesquisa por título
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where('title', 'like', "%$search%");
            }

            // Filtro por status
            if ($request->has('status')) {
                $status = $request->input('status');
                $query->where('status', $status);
            }

            // Paginação
            $perPage = $request->input('per_page', 10);
            $posts = $query->paginate($perPage);

            return response()->json($posts);
        } catch (\Exception $e) {
            Log::error('Erro ao listar posts', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Erro ao carregar posts. Tente novamente mais tarde.'
            ], 500);
        }
    }

    /**
     * Pesquisar posts por título ou conteúdo
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Consulta de pesquisa inválida'
            ], 400);
        }

        try {
            $query = $request->input('query');

            $posts = BlogPost::with('author')
                ->where('title', 'like', "%$query%")
                ->orWhere('content', 'like', "%$query%")
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json($posts);
        } catch (\Exception $e) {
            Log::error('Erro na pesquisa de posts', [
                'query' => $query,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Erro na pesquisa. Tente novamente mais tarde.'
            ], 500);
        }
    }

    /**
     * Listar posts mais vistos
     */
    public function mostViewed(Request $request)
    {
        try {
            $limit = $request->input('limit', 5);

            $posts = BlogPost::with('author')
                ->where('status', 'published')
                ->orderBy('views', 'desc')
                ->take($limit)
                ->get();

            return response()->json($posts);
        } catch (\Exception $e) {
            Log::error('Erro ao listar posts mais vistos', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Erro ao carregar posts mais vistos.'
            ], 500);
        }
    }

    /**
     * Criar novo post
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts,slug',
            'content' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'team_member_id' => 'required|exists:team_members,id',
            'status' => 'required|in:draft,published',
            'category' => 'required|string|max:255', // Campo adicionado
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $imageUrl = null;

        try {
            if ($request->hasFile('cover_image')) {
                $file = $request->file('cover_image');

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
                        'name' => 'blog-posts/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao subir imagem de post', [
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

        try {
            $post = BlogPost::create([
                'title' => $request->title,
                'slug' => $request->slug,
                'content' => $request->content,
                'cover_image' => $imageUrl,
                'team_member_id' => $request->team_member_id,
                'status' => $request->status,
                'category' => $request->category,
            ]);

            return response()->json($post, 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar post', [
                'data' => $request->all(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Erro ao criar post. Tente novamente mais tarde.'
            ], 500);
        }
    }

    /**
     * Mostrar post específico (incrementa visualizações)
     */

    public function show($slug)
    {
        try {
            $post = BlogPost::with('author')
                ->where('slug', $slug)
                ->firstOrFail();

            // Incrementar visualizações
            $post->increment('views');

            return response()->json($post);
        } catch (\Exception $e) {
            Log::error('Erro ao mostrar post', [
                'slug' => $slug,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Post não encontrado.'
            ], 404);
        }
    }

    /**
     * Atualizar post existente
     */

    public function update(Request $request, $id)
    {
        try {
            $post = BlogPost::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Post não encontrado.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:blog_posts,slug,' . $post->id,
            'content' => 'sometimes|required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'team_member_id' => 'sometimes|required|exists:team_members,id',
            'status' => 'sometimes|required|in:draft,published',
            'category' => 'sometimes|required|string|max:255', // Campo adicionado
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $imageUrl = $post->cover_image;

        try {
            if ($request->hasFile('cover_image')) {
                $file = $request->file('cover_image');

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
                        'name' => 'blog-posts/' . time() . '-' . $file->getClientOriginalName()
                    ])
                ]);

                if ($response->successful()) {
                    $imageUrl = "https://gateway.pinata.cloud/ipfs/{$response->json()['IpfsHash']}";
                } else {
                    Log::error('Erro Pinata ao subir imagem de post', [
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

        try {
            $post->update([
                'title' => $request->input('title', $post->title),
                'slug' => $request->input('slug', $post->slug),
                'content' => $request->input('content', $post->content),
                'cover_image' => $imageUrl,
                'team_member_id' => $request->input('team_member_id', $post->team_member_id),
                'status' => $request->input('status', $post->status),
                'category' => $request->input('category', $post->category), // Campo adicionado
            ]);

            return response()->json($post);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar post', [
                'id' => $id,
                'data' => $request->all(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Erro ao atualizar post. Tente novamente mais tarde.'
            ], 500);
        }
    }

    /**
     * Excluir post
     */
    public function destroy($id)
    {
        try {
            $post = BlogPost::findOrFail($id);
            $post->delete();

            return response()->json([
                'message' => 'Post excluído com sucesso!'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir post', [
                'id' => $id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Erro ao excluir post. Tente novamente mais tarde.'
            ], 500);
        }
    }
}
