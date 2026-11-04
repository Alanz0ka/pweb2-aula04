@extends('layouts.app')

@section('titulo', 'Categorias — Laravel MVC')

@section('conteudo')
    <span class="badge">Projeto 2 · Laravel MVC</span>
    <h1>🗂️ Categorias</h1>
    <p class="sub">A View apenas exibe as categorias que o Controller buscou no Model.</p>

    <div class="grid">
        @foreach ($categorias as $categoria)
            <a class="card" href="/categorias/{{ $categoria->id }}">
                <div class="emoji">{{ $categoria->emoji }}</div>
                <p class="nome">{{ $categoria->nome }}</p>
                <p class="desc">{{ $categoria->descricao }}</p>
            </a>
        @endforeach
    </div>
@endsection
