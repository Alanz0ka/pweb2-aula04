<?php
// =============================================================================
// PROJETO 1 — Detalhe do produto (também "tudo junto").
//
// De novo: conexão, SQL, HTML e CSS no mesmo arquivo.
// =============================================================================

$pdo = new PDO('sqlite:' . __DIR__ . '/data/loja.sqlite');

// Pegamos o id que veio pela URL (?id=...).
// Convertemos para inteiro: além de correto, isso evita SQL Injection.
// ⚠️ Curiosidade histórica: muito código antigo concatenava o valor cru
//    ("... WHERE id = " . $_GET['id']) — e essa é a origem de um dos ataques
//    mais clássicos da Web. Guarde a pergunta: como o ORM do Projeto 2 evita isso?
$id = (int) ($_GET['id'] ?? 0);

$sql = "SELECT * FROM produtos WHERE id = $id";
$produto = $pdo->query($sql)->fetch(PDO::FETCH_ASSOC);

// Produto inexistente: respondemos 404 aqui mesmo, no meio do arquivo.
if (!$produto) {
    http_response_code(404);
    echo "<p style='font-family:Arial'>Produto não encontrado. <a href='index.php'>Voltar</a></p>";
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($produto['nome']) ?> — Monólito PHP</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0; font-family: Arial, Helvetica, sans-serif; color: #1c1917;
            background: #f5f5f4; padding: 32px 20px;
        }
        .wrap { max-width: 720px; margin: 0 auto; }
        .badge {
            display: inline-block; padding: 6px 12px; border-radius: 999px;
            background: #fef3c7; color: #b45309; font-weight: bold; font-size: 13px;
        }
        a.voltar { display: inline-block; margin: 16px 0; color: #b45309; text-decoration: none; font-weight: bold; }
        .card {
            background: #fff; border: 1px solid #e7e5e4; border-radius: 16px;
            padding: 36px; display: flex; gap: 28px; align-items: center; flex-wrap: wrap;
        }
        .emoji { font-size: 96px; }
        .info { flex: 1; min-width: 240px; }
        .cat {
            display: inline-block; font-size: 12px; color: #b45309;
            background: #fef3c7; padding: 3px 8px; border-radius: 6px;
        }
        h1 { margin: 10px 0; font-size: 26px; }
        .desc { color: #57534e; line-height: 1.6; }
        .preco { font-size: 30px; color: #16a34a; font-weight: bold; margin: 12px 0 4px; }
        .estoque { color: #78716c; font-size: 14px; }
    </style>
</head>
<body>
    <div class="wrap">
        <span class="badge">Projeto 1 · Monólito PHP (tudo junto)</span><br>
        <a class="voltar" href="index.php">← Voltar para a listagem</a>

        <div class="card">
            <div class="emoji"><?= $produto['emoji'] ?></div>
            <div class="info">
                <span class="cat"><?= htmlspecialchars($produto['categoria']) ?></span>
                <h1><?= htmlspecialchars($produto['nome']) ?></h1>
                <p class="desc"><?= htmlspecialchars($produto['descricao']) ?></p>
                <p class="preco">R$ <?= number_format($produto['preco'], 2, ',', '.') ?></p>
                <p class="estoque"><?= (int) $produto['estoque'] ?> unidades em estoque</p>
            </div>
        </div>
    </div>
</body>
</html>
