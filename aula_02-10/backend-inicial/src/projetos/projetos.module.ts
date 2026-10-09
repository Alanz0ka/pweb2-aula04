import { Module } from '@nestjs/common';
import { ProjetosController } from './projetos.controller';
import { ProjetosService } from './projetos.service';

// Módulo do recurso "projetos": controller + service.
@Module({
  controllers: [ProjetosController],
  providers: [ProjetosService],
})
export class ProjetosModule {}
