# Atividade em Casa: CRUD de Projetos (NestJS)

Programação para Web 2, Aula 05 (NestJS e validação de formulários).

## Como rodar

```bash
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000/api`. Os dados ficam em memória e voltam ao estado inicial quando o servidor reinicia.

## O que foi feito

- CRUD de tarefas da aula concluído: rotas `findOne`, `create`, `update` e `remove`, validações nos DTOs e `ValidationPipe` global (`whitelist`, `forbidNonWhitelisted` e `transform`).
- Novo recurso `src/projetos/` (module, controller, service, DTOs e entity), com as rotas em `/api/projetos`:

| Método e rota | O que faz | Status de sucesso |
|---|---|---|
| `GET /api/projetos` | lista os projetos | 200 |
| `GET /api/projetos/:id` | um projeto (404 se não existir) | 200 |
| `POST /api/projetos` | cria (valida o body) | 201 |
| `PUT /api/projetos/:id` | edita (valida o body) | 200 |
| `DELETE /api/projetos/:id` | exclui | 204 |

Validações do `CreateProjetoDto`:

- `nome`: `@IsString`, `@IsNotEmpty`, `@MinLength(3)` e `@MaxLength(60)`.
- `descricao`: `@IsOptional`, `@IsString` e `@MaxLength(200)`.
- `cor`: `@IsIn(['vermelho', 'verde', 'azul', 'amarelo', 'roxo'])`.

O `UpdateProjetoDto` estende `PartialType(CreateProjetoDto)`, então todos os campos ficam opcionais na edição, com as mesmas regras.

## Desafios feitos

### 1. Relacionar tarefas e projetos

- `projetoId?: number` adicionado à entidade `Tarefa` e ao `CreateTarefaDto`, validado com `@IsOptional()` e `@IsInt()`.
- O `TarefasService.create` passa a gravar o `projetoId` enviado.
- `GET /api/tarefas?projetoId=1` devolve só as tarefas daquele projeto, lendo o parâmetro com `@Query`. Sem o parâmetro, a rota lista todas as tarefas; com um valor que não é inteiro (ex.: `?projetoId=abc`), devolve 400.

Exemplo:

```http
POST /api/tarefas
{ "titulo": "Lista 1", "projetoId": 2 }

GET /api/tarefas?projetoId=2
```

### 2. Mensagens personalizadas

Todos os validadores de projetos e de tarefas usam a opção `{ message: '...' }`, para que os erros 400 expliquem o problema em português. Exemplos:

- `{ "nome": "ab", "cor": "azul" }` retorna "O nome deve ter pelo menos 3 caracteres."
- `{ "nome": "Trabalho", "cor": "rosa" }` retorna "A cor deve ser uma de: vermelho, verde, azul, amarelo, roxo."

### Não feito

- Frontend com a tela de projetos (desafio opcional).

## Critérios de aceite

- [x] `GET /api/projetos` retorna 200 com a lista
- [x] `POST /api/projetos` com `{ "nome": "Faculdade", "cor": "azul" }` retorna 201
- [x] `POST` com `{ "nome": "ab", "cor": "azul" }` retorna 400 (mínimo de 3 caracteres)
- [x] `POST` com `{ "nome": "Trabalho", "cor": "rosa" }` retorna 400 (cor inválida)
- [x] `POST` com um campo a mais (`"xpto": 1`) retorna 400 (`forbidNonWhitelisted`)
- [x] `GET /api/projetos/999` retorna 404
- [x] `PUT /api/projetos/1` com `{ "nome": "Faculdade 2026" }` retorna 200
- [x] `DELETE /api/projetos/1` retorna 204

## Prints do Postman

Um print por critério de aceite, na ordem em que foram executados (servidor com `npm run start:dev`).

| Requisição | Status | Print |
|---|---|---|
| `GET /api/projetos` | 200 | [01-get-lista-200.jpg](prints-postman/01-get-lista-200.jpg) |
| `POST` Faculdade azul | 201 | [02-post-criar-201.jpg](prints-postman/02-post-criar-201.jpg) |
| `POST` nome "ab" | 400 | [03-post-nome-curto-400.jpg](prints-postman/03-post-nome-curto-400.jpg) |
| `POST` cor "rosa" | 400 | [04-post-cor-invalida-400.jpg](prints-postman/04-post-cor-invalida-400.jpg) |
| `POST` com `xpto` | 400 | [05-post-campo-extra-400.jpg](prints-postman/05-post-campo-extra-400.jpg) |
| `GET /api/projetos/999` | 404 | [06-get-999-404.jpg](prints-postman/06-get-999-404.jpg) |
| `PUT /api/projetos/1` | 200 | [07-put-editar-200.jpg](prints-postman/07-put-editar-200.jpg) |
| `DELETE /api/projetos/1` | 204 | [08-delete-204.jpg](prints-postman/08-delete-204.jpg) |

**`GET /api/projetos` (200)**

![`GET /api/projetos` 200](prints-postman/01-get-lista-200.jpg)

**`POST` Faculdade azul (201)**

![`POST` Faculdade azul 201](prints-postman/02-post-criar-201.jpg)

**`POST` nome "ab" (400)**

![`POST` nome "ab" 400](prints-postman/03-post-nome-curto-400.jpg)

**`POST` cor "rosa" (400)**

![`POST` cor "rosa" 400](prints-postman/04-post-cor-invalida-400.jpg)

**`POST` com `xpto` (400)**

![`POST` com `xpto` 400](prints-postman/05-post-campo-extra-400.jpg)

**`GET /api/projetos/999` (404)**

![`GET /api/projetos/999` 404](prints-postman/06-get-999-404.jpg)

**`PUT /api/projetos/1` (200)**

![`PUT /api/projetos/1` 200](prints-postman/07-put-editar-200.jpg)

**`DELETE /api/projetos/1` (204)**

![`DELETE /api/projetos/1` 204](prints-postman/08-delete-204.jpg)
