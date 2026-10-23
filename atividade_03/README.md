# Atividade prática 03: PostgreSQL + TypeORM

Continuação da atividade 02. Os módulos **Tarefas** e **Projetos** deixaram de guardar os dados em
um array em memória e passaram a persistir em tabelas do PostgreSQL, usando TypeORM
(roteiro da aula de 09/10).

## O que mudou em relação à atividade 02

- `docker-compose.yml`: novo serviço `db` (PostgreSQL 16) com volume `pgdata`.
- `backend/src/data-source.ts`: opções de conexão e `DataSource` da CLI (com migrations).
- Entidades `Tarefa` e `Projeto` viraram tabelas (`@Entity`, `@Column`).
- `TarefasService` e `ProjetosService` usam `Repository` do TypeORM (métodos assíncronos);
  os controllers só repassam as promises.
- Migration `CreateTabelas` cria as tabelas `tarefas` e `projetos`.
- `backend/src/seed.ts`: dados iniciais (2 projetos e 3 tarefas).
- O filtro `GET /api/tarefas?projetoId=` e as validações continuam funcionando.

## Como rodar

```bash
cd atividade_03
docker compose up -d db          # banco PostgreSQL (porta 5432)

cd backend
npm install
npm run migration:run            # cria as tabelas
npm run seed                     # dados iniciais
npm run start:dev                # API em http://localhost:3000/api

# em outro terminal, para o frontend (http://localhost:5173)
cd atividade_03 && docker compose up -d frontend
```

Credenciais do banco (apenas desenvolvimento): usuário, senha e banco `todo`
(podem ser trocadas por `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS` e `DB_NAME`).

## Como foi testado

CRUD completo de `/api/tarefas` e `/api/projetos` (200, 201, 204, 400 e 404), filtro por
`projetoId`, e persistência: o backend foi reiniciado e os dados criados continuaram no banco.
A coleção do Postman está em `colecao-projetos.json`.
