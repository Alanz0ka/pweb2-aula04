import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefasModule } from './tarefas/tarefas.module';
import { ProjetosModule } from './projetos/projetos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './data-source';

// Módulo raiz da aplicação. Conecta ao PostgreSQL e importa os outros módulos.
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TarefasModule, ProjetosModule, UsersModule, AuthModule],
})
export class AppModule {}
