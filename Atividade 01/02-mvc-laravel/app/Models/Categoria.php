<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// MODEL da tabela `categorias` — JÁ PRONTO para o exercício.
//
// O nome de cada categoria (ex.: "Periféricos") é o mesmo que aparece na
// coluna `categoria` da tabela `produtos`. Isso permite, na tela de detalhe,
// listar os produtos daquela categoria com:
//
//     Produto::where('categoria', $categoria->nome)->get();
class Categoria extends Model
{
    protected $table = 'categorias';

    public $timestamps = false;

    protected $fillable = ['nome', 'emoji', 'descricao'];
}
