<?php
// =============================================================================
// PROJETO 1 — MONÓLITO "TUDO JUNTO"
//
// Repare que NESTE MESMO ARQUIVO existem, misturados:
//   - conexão com o banco de dados
//   - a query SQL
//   - o HTML
//   - o CSS
//   - a lógica de apresentação (formatação de preço, loop)
//
// Assim se escrevia PHP/ASP/JSP nos anos 90/2000. Funciona, mas tudo está
// acoplado no mesmo lugar. Guarde essa sensação: o Projeto 2 (MVC) vai
// separar cada responsabilidade.
// =============================================================================

// --- Camada de dados (bem no meio de tudo) ---
$pdo = new PDO('sqlite:' . __DIR__ . '/data/loja.sqlite');

$sql = "SELECT id, nome, preco, categoria, emoji FROM produtos ORDER BY id";
$produtos = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loja — Monólito PHP</title>
    <style>
        /* CSS escrito no mesmo arquivo do PHP e do HTML. */
        * { box-sizing: border-box; }
        body {
            margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1c1917;
            background: #f5f5f4; padding: 32px 20px;
        }
        .wrap { max-width: 960px; margin: 0 auto; }
        .badge {
            display: inline-block; padding: 6px 12px; border-radius: 999px;
            background: #fef3c7; color: #b45309; font-weight: bold; font-size: 13px;
        }
        h1 { margin: 12px 0 4px; font-size: 28px; }
        .sub { color: #78716c; margin: 0 0 28px; }
        .grid {
            display: grid; gap: 18px;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
        .card {
            display: block; text-decoration: none; color: inherit;
            background: #fff; border: 1px solid #e7e5e4; border-radius: 14px;
            padding: 22px; transition: transform .06s ease, box-shadow .2s ease;
        }
        .card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,.10); }
        .emoji { font-size: 46px; }
        .cat {
            display: inline-block; margin: 10px 0 8px; font-size: 12px;
            color: #b45309; background: #fef3c7; padding: 3px 8px; border-radius: 6px;
        }
        .nome { font-size: 17px; font-weight: bold; margin: 0 0 6px; }
        .preco { font-size: 18px; color: #16a34a; font-weight: bold; margin: 0; }
    </style>
</head>
<body>
    <div class="wrap">
        <span class="badge">Projeto 1 · Monólito PHP (tudo junto)</span>
        <h1>🛒 Loja Web 2</h1>
        <p class="sub">Listagem gerada por PHP, com HTML, CSS e SQL no mesmo arquivo.</p>

        <div class="grid">
            <?php foreach ($produtos as $p): ?>
                <!-- O PHP entra no meio do HTML para montar cada card -->
                <a class="card" href="produto.php?id=<?= (int) $p['id'] ?>">
                    <div class="emoji"><?= $p['emoji'] ?></div>
                    <span class="cat"><?= htmlspecialchars($p['categoria']) ?></span>
                    <p class="nome"><?= htmlspecialchars($p['nome']) ?></p>
                    <p class="preco">R$ <?= number_format($p['preco'], 2, ',', '.') ?></p>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
