import { Injectable, NotFoundException } from '@nestjs/common';
import { Projeto } from './entities/projeto.entity';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  // "Banco de dados" em memória. Some ao reiniciar o servidor.
  private projetos: Projeto[] = [
    { id: 1, nome: 'Faculdade', descricao: 'Disciplinas do semestre', cor: 'azul' },
    { id: 2, nome: 'Pessoal', cor: 'verde' },
  ];
  private proximoId = 3;

  findAll(): Projeto[] {
    return this.projetos;
  }

  findOne(id: number): Projeto {
    const projeto = this.projetos.find((p) => p.id === id);
    if (!projeto) {
      throw new NotFoundException(`Projeto ${id} não encontrado.`);
    }
    return projeto;
  }

  create(dto: CreateProjetoDto): Projeto {
    const projeto: Projeto = { id: this.proximoId++, ...dto };
    this.projetos.push(projeto);
    return projeto;
  }

  update(id: number, dto: UpdateProjetoDto): Projeto {
    const projeto = this.findOne(id);
    Object.assign(projeto, dto);
    return projeto;
  }

  remove(id: number): void {
    this.findOne(id);
    this.projetos = this.projetos.filter((p) => p.id !== id);
  }
}
