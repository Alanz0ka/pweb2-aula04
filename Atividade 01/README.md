# Programação para Web 2 — Três Arquiteturas, a Mesma Loja

> **A pergunta da aula:** a mesma tela (listar produtos e ver o detalhe de um
> produto) pode ser construída de várias formas. **Onde fica cada
> responsabilidade** — buscar dados, aplicar regras e montar a interface — em
> cada uma delas?

Este repositório traz **a mesma loja** (listagem de produtos + página de
detalhe) implementada em **três arquiteturas diferentes**, para mostrar a
evolução do desenvolvimento Web:

```text
1) Monólito "tudo junto"      HTML + CSS + SQL no mesmo arquivo (PHP)
            ↓
2) MVC                        Model / Controller / View separados (Laravel)
            ↓
3) API + Front apartado       API que só devolve dados (Node) + SPA (React)
```

Os **produtos são os mesmos** nos três projetos — só muda **como** o código é
organizado.

---

## Pré-requisitos

Só é preciso **Docker**. Nada de PHP, Node ou Composer instalados na máquina.

```bash
docker --version
docker compose version
```

---

## Executando tudo

Na raiz do repositório:

```bash
docker compose up --build
```

Em outro terminal:

```bash
docker ps
```

| Projeto | Arquitetura            | URL                          | Tecnologia        |
| ------- | ---------------------- | ---------------------------- | ----------------- |
| 1       | Monólito "tudo junto"  | http://localhost:8091        | PHP + SQLite      |
| 2       | MVC                    | http://localhost:8092        | Laravel + Blade   |
| 3a      | API (dados)            | http://localhost:8093/api/produtos | Node + Express |
| 3b      | Front (SPA)            | http://localhost:8094        | React + Vite      |

> A primeira execução demora mais (build do Laravel via Composer e build do
> React via npm). Depois, o cache deixa tudo rápido.

---

## Projeto 1 — Monólito "tudo junto"

**URL:** http://localhost:8091

Abra `01-monolito-php/index.php` no editor **enquanto** mostra a página. No
**mesmo arquivo** estão: a conexão com o banco, a query SQL, o HTML e o CSS.

```text
Browser
   | GET /
   v
index.php  ── conexão + SQL + HTML + CSS, tudo junto ──►  HTML pronto
   v
Browser
```

Clique em um produto para ir a `produto.php?id=...` (o detalhe, também "tudo junto").

**A ideia:** funciona, mas tudo está **acoplado**. Mudar uma coisa mexe em tudo.

---

## Projeto 2 — MVC (separando responsabilidades)

**URL:** http://localhost:8092

O mesmo resultado, mas agora cada responsabilidade tem seu lugar:

```text
Rota (routes/web.php)
   v
Controller (ProdutoController)  ── pede dados ──►  Model (Produto)  ──►  Banco
   v
View (Blade: produtos/index)    ── só exibe ──►  HTML
```

Percorra os arquivos na aula, nesta ordem:

1. `routes/web.php` — a URL aponta para um método do Controller.
2. `app/Http/Controllers/ProdutoController.php` — busca no Model e escolhe a View. **Sem HTML, sem SQL.**
3. `app/Models/Produto.php` — a única camada que "sabe" do banco.
4. `resources/views/produtos/index.blade.php` — **só** exibe. Sem SQL.

**A ideia:** as mesmas tarefas de antes, agora **separadas em camadas**.

---

## Projeto 3 — API + Front apartado

**URLs:** API em http://localhost:8093 · Front em http://localhost:8094

Aqui a separação vai além: o **backend não gera mais tela nenhuma**. Ele só
entrega **dados (JSON)**. Quem monta a interface é o **React**, no navegador.

Primeiro, veja que a API devolve **dados puros**:

```bash
curl http://localhost:8093/api/produtos
curl http://localhost:8093/api/produtos/1
curl -i http://localhost:8093/api/produtos/999   # 404
```

Depois abra o front em http://localhost:8094 com o **DevTools → Network** aberto
e o terminal da API à vista:

```bash
docker compose logs -f api
```

```text
React (browser, :8094)
   | fetch GET /api/produtos
   v
API Node/Express (:8093)  ── JSON ──►  React monta a listagem
   |
   | (clicar num produto → fetch GET /api/produtos/:id)
   v
React monta o detalhe
```

**A ideia:** **backend e frontend viram aplicações independentes** que
conversam por HTTP. A mesma API serve web, mobile, outro servidor, etc.

---

## Atividade 01 — Rotas de categorias

Implementação das rotas de **categorias** nos Projetos 2 e 3, seguindo o mesmo
padrão já usado para produtos.

### Projeto 2 — Laravel MVC

| Método | Rota               | Controller                    | View               |
| ------ | ------------------ | ----------------------------- | ------------------ |
| GET    | `/categorias`      | `CategoriaController@index`   | `categorias.index` |
| GET    | `/categorias/{id}` | `CategoriaController@show`    | `categorias.show`  |

- `routes/web.php` — registra as duas rotas.
- `app/Http/Controllers/CategoriaController.php`
  - `index()` → `Categoria::orderBy('id')->get()`
  - `show($id)` → `Categoria::findOrFail($id)` (404 se não existir) e
    `Produto::where('categoria', $categoria->nome)->get()` para os produtos da categoria.
- `resources/views/categorias/index.blade.php` e `show.blade.php` — estendem
  `layouts.app` e só exibem os dados.

```bash
docker compose up --build mvc
# http://localhost:8092/categorias
# http://localhost:8092/categorias/1
# http://localhost:8092/categorias/999   -> 404
```

### Projeto 3 — API Node/Express

| Método | Rota                  | Resposta                                        |
| ------ | --------------------- | ----------------------------------------------- |
| GET    | `/api/categorias`     | Lista de categorias                             |
| GET    | `/api/categorias/:id` | Categoria + array `produtos` (ou 404)           |

- `03-api-react/api/src/server.js` — importa `categorias.js` e cria os dois
  endpoints. O detalhe filtra `produtos` por `p.categoria === categoria.nome`;
  se o id não existir, responde `404 { "error": "Categoria não encontrada" }`.
- O front React (`CategoryList` e `CategoryDetail`) já consumia esses endpoints
  e passa a funcionar sem alterações.

```bash
docker compose up --build api
curl http://localhost:8093/api/categorias
curl http://localhost:8093/api/categorias/1
curl -i http://localhost:8093/api/categorias/999   # 404
# front: http://localhost:8094/categorias
```

---

## Comparando as três arquiteturas

| Responsabilidade        | Projeto 1 (monólito) | Projeto 2 (MVC)          | Projeto 3 (API + React)     |
| ----------------------- | -------------------- | ------------------------ | --------------------------- |
| Buscar dados            | `$pdo->query()` no arquivo da página | Model (Eloquent)   | API (endpoint JSON)         |
| Regras / decisões       | Misturadas no HTML   | Controller               | API (servidor)              |
| Montar a interface      | HTML no mesmo arquivo | View (Blade), no servidor | React, no navegador       |
| Onde o HTML nasce       | No servidor          | No servidor              | No navegador (cliente)      |
| Acoplamento             | Altíssimo            | Baixo (camadas)          | Baixo (apps separados)      |
| Serve mobile/outros?    | Não naturalmente     | Não naturalmente         | Sim (é só JSON)             |

**Onde a lógica de tela é executada:**

```text
Projeto 1:  servidor gera o HTML   (tudo junto)
Projeto 2:  servidor gera o HTML   (mas organizado em camadas)
Projeto 3:  servidor gera DADOS  →  navegador gera o HTML
```

---

## Comandos úteis

```bash
# subir tudo
docker compose up --build

# em background
docker compose up --build -d

# containers em execução
docker ps

# logs da API (Projeto 3)
docker compose logs -f api

# parar
docker compose down
```

---

## Tecnologias e versões

| Projeto | Stack                     | Imagem / versão            |
| ------- | ------------------------- | -------------------------- |
| 1       | PHP + SQLite (PDO)        | `php:8.3-cli`              |
| 2       | Laravel + Blade + SQLite  | `php:8.3-cli`, Laravel stable via `composer:2` |
| 3a      | Node.js + Express         | `node:22-alpine`, Express 4.21 |
| 3b      | React + Vite + React Router | React 18.3, Vite 5.4, React Router 6 |

---

## Continuação da Aula 02

Na Aula 02 vimos *estático × dinâmico*, *client-side × server-side*, *request/
response*, *HTTP*, *JSON*, *API* e *CORS*. Aqui aplicamos tudo isso numa mesma
funcionalidade real (uma loja) para comparar **como o código é organizado** em
cada geração de arquitetura Web.
