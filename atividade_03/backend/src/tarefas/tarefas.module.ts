import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefasController } from './tarefas.controller';
import { TarefasService } from './tarefas.service';
import { Tarefa } from './entities/tarefa.entity';

// Um módulo agrupa um recurso: aqui, o controller e o service de "tarefas".
// forFeature registra a entidade para podermos injetar o Repository<Tarefa>.
@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
