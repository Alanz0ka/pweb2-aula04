# Atividade prática 05: upload de arquivos (bucket) e envio de e-mail

Continuação da atividade 04 (NestJS + TypeORM + PostgreSQL + JWT em cookie httpOnly), seguindo o
roteiro da aula de 06/11. Cada tarefa agora aceita um **anexo** (imagem ou PDF) guardado num bucket
do Supabase Storage, e o usuário logado recebe um **e-mail** (Resend) quando cria uma tarefa.
O frontend é o da aula: o botão de clipe de cada tarefa envia o arquivo e o link "ver anexo"
aponta para a URL pública do bucket.

## O que foi feito

- **Entidade**: coluna `anexoUrl` em `tarefas` (migration `AddAnexoUrl`).
- **Upload** (`POST /api/tarefas/:id/anexo`, `multipart/form-data`, campo `arquivo`):
  `FileInterceptor` sem `storage` (arquivo em memória) e `ParseFilePipe` com
  `MaxFileSizeValidator` (5 MB) e `FileTypeValidator` (png, jpg, webp, gif e pdf).
  Tarefa inexistente responde 404 antes de enviar qualquer coisa ao bucket.
- **`StorageService`** (`src/storage`): envia o buffer ao Supabase com nome aleatório
  (`tarefas/<uuid>.<extensão>`, o nome original nunca é usado) e devolve a URL pública.
  O cliente é criado sob demanda; sem `SUPABASE_URL`/`SUPABASE_SERVICE_KEY` a resposta é 500
  com mensagem clara.
- **`MailService`** (`src/mail`): envia "Nova tarefa criada" pelo Resend. O título é escapado
  antes de entrar no HTML. Sem `RESEND_API_KEY` apenas registra um aviso.
- **E-mail sem bloquear**: `TarefasService.create` não usa `await` no envio e trata a falha
  com `.catch`; o destinatário é o e-mail do token JWT (`req.user.email`).
- `main.ts` carrega o `.env` na primeira linha (`import 'dotenv/config'`). O `.env` está no
  `.gitignore`; `backend/.env.example` mostra as variáveis.

## Como rodar

```bash
cd "Atividade 05"
docker compose up -d db          # PostgreSQL (porta 5432, usuário/senha/banco: todo)

cd backend
cp .env.example .env             # preencha SUPABASE_* e RESEND_API_KEY
npm install
npm run migration:run
npm run start:dev                # API em http://localhost:3000/api

# frontend em http://localhost:5173
cd .. && docker compose up -d --build frontend
```

No Supabase: criar o bucket `anexos` como **público**. A `service_role key` fica só no `.env` do
backend. Sem domínio verificado, o Resend só entrega para o e-mail da conta dele, a partir de
`onboarding@resend.dev`.

## Como foi testado

Com curl e cookie jar (`-c` / `-b`), seguindo a seção 7 do roteiro. Como as chaves reais não
estavam no ambiente, o Supabase Storage e o Resend foram substituídos por um servidor local que
imita as duas APIs (`SUPABASE_URL` e `RESEND_BASE_URL` apontando para ele). Isso valida a
integração do código (rota, validação, envio do buffer, URL gravada, disparo do e-mail), mas
**não** o envio com as contas reais.

| Requisição | Resultado |
|---|---|
| `POST /api/tarefas` e `POST /api/tarefas/1/anexo` sem cookie | 401 |
| `POST /api/tarefas` logado | 201 em ~16 ms; o e-mail sai em segundo plano (o envio simulado leva 1,5 s) |
| `POST /api/tarefas/1/anexo` com PNG e com PDF | 201, `anexoUrl` preenchido e salvo |
| `GET /api/tarefas` | tarefa com `anexoUrl` |
| Anexo `.txt` | 400 |
| Anexo de 6 MB | 400 |
| Requisição sem o campo `arquivo` | 400 |
| Anexo em tarefa inexistente | 404 |
| Anexo sem `SUPABASE_*` configurado | 500 com mensagem clara |
| Criar tarefa sem `RESEND_API_KEY` | 201, aviso no log |

Também: `migration:generate` não encontra diferenças entre as entidades e o banco, e o frontend
compila (`npm run build`).
