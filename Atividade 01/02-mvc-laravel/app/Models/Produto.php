<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// MODEL (o "M" do MVC).
//
// Representa a tabela `produtos`. É a única camada que "sabe" sobre dados.
// O Controller pede coisas ao Model; a View nunca fala direto com o banco.
class Produto extends Model
{
    protected $table = 'produtos';

    // Nosso exemplo não usa as colunas created_at / updated_at.
    public $timestamps = false;

    protected $fillable = ['nome', 'preco', 'categoria', 'emoji', 'descricao', 'estoque'];
}
