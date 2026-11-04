# Projeto 2 — Laravel MVC.
#
# O build cria um projeto Laravel novo com o Composer e depois SOBRESCREVE os
# arquivos que interessam para a aula/exercício. Assim o repositório fica enxuto
# e não é preciso ter PHP/Composer instalados na máquina.

FROM php:8.3-cli

# Dependências que o Composer precisa para baixar/extrair pacotes.
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip git libzip-dev \
    && docker-php-ext-install zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Cria um projeto Laravel novo (gera .env, APP_KEY e usa SQLite por padrão).
RUN composer create-project laravel/laravel . --no-interaction --prefer-dist

# Sobrescreve/adiciona os arquivos do MVC copiando PASTAS inteiras.
# Vantagem para o exercício: ao criar novos arquivos (Controller, rotas, views),
# basta reconstruir a imagem — não é preciso editar este Dockerfile.
COPY app/ app/
COPY routes/ routes/
COPY database/ database/
COPY resources/views/ resources/views/

EXPOSE 8000

# Prepara o banco SQLite e sobe o servidor, tudo em um único comando.
# Não usamos um script .sh externo de propósito: isso evita o erro
# "/entrypoint.sh: not found" que aparecia ao clonar o repositório no
# Windows (o Git convertia as quebras de linha para CRLF e quebrava o script).
CMD ["sh", "-c", "touch database/database.sqlite && php artisan migrate:fresh --seed --force && php artisan serve --host=0.0.0.0 --port=8000"]
