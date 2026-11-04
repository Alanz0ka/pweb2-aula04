<?php

namespace App\Http\Controllers;

use App\Models\Produto;

// CONTROLLER (o "C" do MVC).
//
// Recebe a requisição, pede os dados ao Model e escolhe qual View renderizar.
// Repare: aqui NÃO há SQL escrito à mão e NÃO há HTML. Cada camada no seu lugar.
class ProdutoController extends Controller
{
    // Listagem: GET /
    public function index()
    {
        $produtos = Produto::orderBy('id')->get();

        return view('produtos.index', [
            'produtos' => $produtos,
        ]);
    }

    // Detalhe: GET /produtos/{id}
    public function show(int $id)
    {
        // findOrFail devolve 404 automaticamente se o produto não existir.
        $produto = Produto::findOrFail($id);

        return view('produtos.show', [
            'produto' => $produto,
        ]);
    }
}
