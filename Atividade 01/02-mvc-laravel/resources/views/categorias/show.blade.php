@extends('layouts.app')

@section('titulo', $categoria->nome . ' — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span><br>
    <a class="voltar" href="/categorias">← Voltar para categorias</a>

    <div class="detalhe">
        <div class="emoji">{{ $categoria->emoji }}</div>
        <div class="info">
            <span class="cat">Categoria</span>
            <h1>{{ $categoria->nome }}</h1>
            <p class="desc">{{ $categoria->descricao }}</p>
        </div>
    </div>

    <h2>Produtos desta categoria</h2>
    <div class="grid">
        @forelse ($produtos as $produto)
            <a class="card" href="/produtos/{{ $produto->id }}">
                <div class="emoji">{{ $produto->emoji }}</div>
                <p class="nome">{{ $produto->nome }}</p>
                <p class="preco">R$ {{ number_format($produto->preco, 2, ',', '.') }}</p>
            </a>
        @empty
            <p class="sub">Nenhum produto nesta categoria.</p>
        @endforelse
    </div>
@endsection
