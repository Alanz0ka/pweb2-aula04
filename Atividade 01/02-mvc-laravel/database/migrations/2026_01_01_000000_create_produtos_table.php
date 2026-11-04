<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// MIGRATION: descreve a estrutura da tabela em código (versionável),
// em vez de rodar CREATE TABLE na mão direto no banco.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->decimal('preco', 10, 2);
            $table->string('categoria');
            $table->string('emoji');
            $table->text('descricao');
            $table->integer('estoque');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
