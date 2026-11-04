<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Produto;

// CONTROLLER de categorias: mesmo padrão do ProdutoController.
// Pede os dados aos Models e escolhe a View. Sem SQL à mão, sem HTML.
class CategoriaController extends Controller
{
    // Listagem: GET /categorias
    public function index()
    {
        $categorias = Categoria::orderBy('id')->get();

        return view('categorias.index', [
            'categorias' => $categorias,
        ]);
    }

    // Detalhe: GET /categorias/{id}
    public function show(int $id)
    {
        // findOrFail devolve 404 automaticamente se a categoria não existir.
        $categoria = Categoria::findOrFail($id);

        // Produtos ligados à categoria pelo nome.
        $produtos = Produto::where('categoria', $categoria->nome)->orderBy('id')->get();

        return view('categorias.show', [
            'categoria' => $categoria,
            'produtos' => $produtos,
        ]);
    }
}
