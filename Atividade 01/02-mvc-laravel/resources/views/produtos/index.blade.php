@extends('layouts.app')

@section('titulo', 'Loja — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span>
    <h1>🛒 Loja Web 2</h1>
    <p class="sub">A View apenas exibe. Quem buscou os dados foi o Controller, através do Model.</p>

    <div class="grid">
        {{-- A View recebe $produtos pronto do Controller e só percorre a lista. --}}
        @foreach ($produtos as $produto)
            <a class="card" href="/produtos/{{ $produto->id }}">
                <div class="emoji">{{ $produto->emoji }}</div>
                <span class="cat">{{ $produto->categoria }}</span>
                <p class="nome">{{ $produto->nome }}</p>
                <p class="preco">R$ {{ number_format($produto->preco, 2, ',', '.') }}</p>
            </a>
        @endforeach
    </div>
@endsection
