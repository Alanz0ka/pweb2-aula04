# Projeto 1 — Monólito PHP.
#
# Usamos o servidor embutido do PHP (php -S). Não há framework, não há
# separação de camadas: cada arquivo .php responde por uma página inteira.

FROM php:8.3-cli

WORKDIR /app

# Copia o código (index.php, produto.php, seed.php).
COPY . .

# Cria o banco SQLite de exemplo durante o build.
# (pdo_sqlite já vem habilitado na imagem oficial do PHP.)
RUN php seed.php

EXPOSE 8000

# Servidor de desenvolvimento embutido do PHP servindo a pasta atual.
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/app"]
