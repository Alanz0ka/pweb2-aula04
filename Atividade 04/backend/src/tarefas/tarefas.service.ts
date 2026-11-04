import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';

// @Injectable marca a classe como um "provider": o Nest sabe criar e injetar
// esta instância onde ela for pedida (ex.: no construtor do controller).
@Injectable()
export class TarefasService {
  // O Repository do TypeORM substitui o array em memória: agora os dados
  // ficam na tabela "tarefas" do PostgreSQL e sobrevivem ao reinício.
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepo: Repository<Tarefa>,
  ) {}

  // Com projetoId, devolve só as tarefas daquele projeto (desafio).
  findAll(projetoId?: number): Promise<Tarefa[]> {
    return this.tarefaRepo.find({
      where: projetoId === undefined ? {} : { projetoId },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefaRepo.findOneBy({ id });
    if (!tarefa) {
      // NotFoundException vira automaticamente uma resposta HTTP 404.
      throw new NotFoundException('Tarefa não encontrada');
    }
    return tarefa;
  }

  create(dto: CreateTarefaDto): Promise<Tarefa> {
    const tarefa = this.tarefaRepo.create(dto);
    return this.tarefaRepo.save(tarefa);
  }

  async update(id: number, dto: UpdateTarefaDto): Promise<Tarefa> {
    const tarefa = await this.findOne(id);
    Object.assign(tarefa, dto); // atualiza apenas os campos enviados
    return this.tarefaRepo.save(tarefa);
  }

  async remove(id: number): Promise<void> {
    const tarefa = await this.findOne(id);
    await this.tarefaRepo.remove(tarefa);
  }
}
