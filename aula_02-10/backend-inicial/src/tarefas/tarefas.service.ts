import { Injectable } from '@nestjs/common';
import { Tarefa } from './entities/tarefa.entity';

// @Injectable marca a classe como um "provider" que o Nest injeta onde for pedido.
@Injectable()
export class TarefasService {
  // "Banco de dados" em memória (por enquanto). Some ao reiniciar o servidor.
  private tarefas: Tarefa[] = [
    { id: 1, titulo: 'Estudar NestJS', descricao: 'Módulos, controllers e services', concluida: false },
  ];
  private proximoId = 2;

  // =====================================================================
  // TODO (aula): implementar os métodos do CRUD, seguindo o ROTEIRO-AULA.md:
  //   findAll()            -> listar
  //   findOne(id)          -> buscar uma (404 se não existir)
  //   create(dto)          -> criar
  //   update(id, dto)      -> editar
  //   remove(id)           -> excluir
  // =====================================================================
}
