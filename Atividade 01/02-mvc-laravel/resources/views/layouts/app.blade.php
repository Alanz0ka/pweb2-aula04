<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('titulo', 'Loja — Laravel MVC')</title>
    <style>
        /* Layout compartilhado: as views index/show reaproveitam este visual. */
        * { box-sizing: border-box; }
        body {
            margin: 0; font-family: Arial, Helvetica, sans-serif; color: #0f172a;
            background: #f1f5f9; padding: 32px 20px;
        }
        .wrap { max-width: 960px; margin: 0 auto; }
        .badge {
            display: inline-block; padding: 6px 12px; border-radius: 999px;
            background: #eef2ff; color: #4f46e5; font-weight: bold; font-size: 13px;
        }
        h1 { margin: 12px 0 4px; font-size: 28px; }
        .sub { color: #64748b; margin: 0 0 28px; }
        .grid {
            display: grid; gap: 18px;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
        .card {
            display: block; text-decoration: none; color: inherit;
            background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
            padding: 22px; transition: transform .06s ease, box-shadow .2s ease;
        }
        .card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,.10); }
        .emoji { font-size: 46px; }
        .cat {
            display: inline-block; margin: 10px 0 8px; font-size: 12px;
            color: #4f46e5; background: #eef2ff; padding: 3px 8px; border-radius: 6px;
        }
        .nome { font-size: 17px; font-weight: bold; margin: 0 0 6px; }
        .preco { font-size: 18px; color: #16a34a; font-weight: bold; margin: 0; }

        a.voltar { display: inline-block; margin: 16px 0; color: #4f46e5; text-decoration: none; font-weight: bold; }
        .detalhe {
            background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
            padding: 36px; display: flex; gap: 28px; align-items: center; flex-wrap: wrap;
        }
        .detalhe .emoji { font-size: 96px; }
        .info { flex: 1; min-width: 240px; }
        .desc { color: #475569; line-height: 1.6; }
        .preco-lg { font-size: 30px; color: #16a34a; font-weight: bold; margin: 12px 0 4px; }
        .estoque { color: #64748b; font-size: 14px; }

        /* Menu de navegação entre Produtos e Categorias. */
        .nav { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .nav a {
            text-decoration: none; font-weight: bold; font-size: 14px; color: #4f46e5;
            padding: 8px 14px; border-radius: 8px; background: #fff; border: 1px solid #e2e8f0;
        }
        .nav a:hover { background: #eef2ff; }
    </style>
</head>
<body>
    <div class="wrap">
        {{-- Menu fixo. O link "Categorias" aponta para a rota que VOCÊ vai criar
             no exercício. Enquanto ela não existir, clicar aqui dá erro 404. --}}
        <nav class="nav">
            <a href="/">Produtos</a>
            <a href="/categorias">Categorias</a>
        </nav>

        @yield('conteudo')
    </div>
</body>
</html>
