<?php
// -----------------------------------------------------------------------------
// seed.php — roda UMA vez, durante o build da imagem, só para criar o banco.
//
// Na aula, o foco é o index.php / produto.php (onde HTML, CSS e SQL estão
// todos misturados). Este arquivo apenas prepara os dados de exemplo.
// -----------------------------------------------------------------------------

@mkdir(__DIR__ . '/data', 0777, true);

$pdo = new PDO('sqlite:' . __DIR__ . '/data/loja.sqlite');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec("DROP TABLE IF EXISTS produtos");
$pdo->exec("
    CREATE TABLE produtos (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        nome      TEXT    NOT NULL,
        preco     REAL    NOT NULL,
        categoria TEXT    NOT NULL,
        emoji     TEXT    NOT NULL,
        descricao TEXT    NOT NULL,
        estoque   INTEGER NOT NULL
    )
");

$produtos = [
    ['Teclado Mecânico RGB',      349.90, 'Periféricos', '⌨️', 'Switches azuis, layout ABNT2 e iluminação RGB personalizável.', 24],
    ['Mouse Gamer 16000 DPI',     199.90, 'Periféricos', '🖱️', 'Sensor óptico de 16000 DPI e 7 botões programáveis.', 40],
    ['Monitor 27" 144Hz',        1499.00, 'Monitores',   '🖥️', 'Painel IPS Full HD, 144Hz e 1ms de resposta.', 12],
    ['Headset 7.1 Surround',      279.90, 'Áudio',       '🎧', 'Som surround 7.1 e microfone com cancelamento de ruído.', 30],
    ['Webcam Full HD 1080p',      189.90, 'Vídeo',       '📷', 'Gravação em 1080p a 30fps com foco automático.', 18],
    ['Cadeira Gamer Ergonômica', 1199.00, 'Mobiliário',  '🪑', 'Reclinável até 180°, apoio lombar e couro sintético.', 8],
];

$stmt = $pdo->prepare(
    "INSERT INTO produtos (nome, preco, categoria, emoji, descricao, estoque)
     VALUES (?, ?, ?, ?, ?, ?)"
);

foreach ($produtos as $p) {
    $stmt->execute($p);
}

echo "Banco criado com " . count($produtos) . " produtos.\n";
