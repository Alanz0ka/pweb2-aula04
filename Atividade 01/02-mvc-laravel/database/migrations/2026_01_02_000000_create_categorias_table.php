<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// MIGRATION da tabela `categorias` — JÁ PRONTA para o exercício.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('emoji');
            $table->text('descricao');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categorias');
    }
};
