@extends('layouts.app')

@section('titulo', $produto->nome . ' — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span><br>
    <a class="voltar" href="/">← Voltar para a listagem</a>

    <div class="detalhe">
        <div class="emoji">{{ $produto->emoji }}</div>
        <div class="info">
            <span class="cat">{{ $produto->categoria }}</span>
            <h1>{{ $produto->nome }}</h1>
            <p class="desc">{{ $produto->descricao }}</p>
            <p class="preco-lg">R$ {{ number_format($produto->preco, 2, ',', '.') }}</p>
            <p class="estoque">{{ $produto->estoque }} unidades em estoque</p>
        </div>
    </div>
@endsection
