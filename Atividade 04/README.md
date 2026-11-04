# Atividade prática 04: autenticação com JWT + cookie httpOnly

Continuação da atividade 03 (NestJS + TypeORM + PostgreSQL), seguindo o roteiro da aula de 23/10.
O backend passou a ter cadastro e login de usuários, guarda o JWT num cookie httpOnly e protege
as rotas de **tarefas** e de **projetos**. O frontend é o da aula (telas de Login e Cadastro e a
tela de tarefas protegida).

## O que foi feito

- **Usuário**: entidade `User` (tabela `usuarios`: `id`, `email` único, `senha` com hash bcrypt),
  `UsersService` e `UsersModule`; migration `CreateUsers`.
- **Autenticação** (`src/auth`):
  - `AuthService`: cadastro (409 para e-mail repetido), validação da senha com `bcrypt.compare`
    e login, que assina o JWT com `sub` = id do usuário e expiração de 1 dia.
  - `AuthDto`: valida e-mail e senha (mínimo 6 caracteres) com class-validator.
  - `JwtStrategy`: lê o token do cookie `access_token` (não do header) e devolve
    `{ userId, email }` em `req.user`.
  - `JwtAuthGuard` e `AuthController` com `POST /api/auth/register`, `POST /api/auth/login`
    (define o cookie `httpOnly`, `sameSite: 'lax'`), `POST /api/auth/logout` e `GET /api/auth/me`.
- **Rotas protegidas**: `@UseGuards(JwtAuthGuard)` no `TarefasController` e no
  `ProjetosController`. Sem cookie válido, qualquer rota de `/api/tarefas` e `/api/projetos`
  responde 401.
- `main.ts` usa `cookie-parser`; `tsconfig.json` ganhou `esModuleInterop` para o import default.
- O segredo do JWT vem de `JWT_SECRET` (padrão de aula: `segredo-da-aula`).

## Como rodar

```bash
cd "Atividade 04"
docker compose up -d db          # PostgreSQL (porta 5432, usuário/senha/banco: todo)

cd backend
npm install
npm run migration:run            # cria tarefas, projetos e usuarios
npm run seed                     # dados iniciais (opcional)
npm run start:dev                # API em http://localhost:3000/api

# em outro terminal: frontend em http://localhost:5173
cd "Atividade 04" && docker compose up -d --build frontend
```

## Como foi testado

Com curl e cookie jar (`-c cookies.txt` / `-b cookies.txt`), seguindo o passo 8 do roteiro:

| Requisição | Resultado |
|---|---|
| `POST /api/auth/register` | 201 |
| `POST /api/auth/register` com o mesmo e-mail | 409 |
| `POST /api/auth/register` com e-mail inválido | 400 |
| `GET /api/tarefas`, `/api/projetos`, `/api/auth/me` sem cookie | 401 |
| `POST /api/auth/login` | 201, cookie `access_token` HttpOnly |
| `GET /api/auth/me` logado | 200, `{ userId, email }` lido do token |
| `GET /api/tarefas`, `POST /api/tarefas` logado | 200 / 201 |
| `GET /api/projetos`, `POST /api/projetos` logado | 200 / 201 |
| `POST /api/auth/login` com senha errada | 401 |
| `POST /api/auth/logout` e depois `GET /api/auth/me` | 201 e 401 |
| Cookie com token adulterado | 401 |

No navegador (http://localhost:5173): sem sessão a tela cai em `/login`; o cadastro cria a conta,
faz login e abre a lista de tarefas; criar, concluir e excluir tarefas funcionam pela API
protegida; `document.cookie` fica vazio (o JavaScript não lê o token); "Sair" volta para `/login`
e recarregar `/` deslogado também redireciona.
