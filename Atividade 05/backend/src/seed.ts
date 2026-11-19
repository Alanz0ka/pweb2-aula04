import dataSource from './data-source';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import { Projeto } from './projetos/entities/projeto.entity';

// Popula as tabelas com dados iniciais. Uso: npm run seed
async function seed() {
  await dataSource.initialize();

  // clear() usa TRUNCATE; CASCADE e RESTART IDENTITY zeram também os ids.
  await dataSource.query('TRUNCATE TABLE "tarefas", "projetos" RESTART IDENTITY CASCADE');

  const projetos = await dataSource.getRepository(Projeto).save([
    { nome: 'Faculdade', descricao: 'Disciplinas do semestre', cor: 'azul' },
    { nome: 'Pessoal', cor: 'verde' },
  ]);

  await dataSource.getRepository(Tarefa).save([
    { titulo: 'Estudar ORM', descricao: 'TypeORM + PostgreSQL', concluida: false, projetoId: projetos[0].id },
    { titulo: 'Preparar a aula de hoje', concluida: true, projetoId: projetos[0].id },
    { titulo: 'Organizar a semana', concluida: false, projetoId: projetos[1].id },
  ]);

  console.log('Seed concluído!');
  await dataSource.destroy();
}
seed();
