import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';

// @Controller('tarefas') + prefixo global 'api' => rotas em /api/tarefas.
@Controller('tarefas')
export class TarefasController {
  // Injeção de dependência: o Nest entrega uma instância de TarefasService.
  constructor(private readonly tarefasService: TarefasService) {}

  // GET /api/tarefas?projetoId=1 filtra as tarefas de um projeto (desafio).
  @Get()
  findAll(@Query('projetoId') projetoId?: string) {
    if (projetoId === undefined) {
      return this.tarefasService.findAll();
    }
    const id = Number(projetoId);
    if (!Number.isInteger(id)) {
      throw new BadRequestException('O projetoId deve ser um número inteiro.');
    }
    return this.tarefasService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTarefaDto) {
    return this.tarefasService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTarefaDto,
  ) {
    return this.tarefasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) // 204 No Content: sucesso sem corpo na resposta
  remove(@Param('id', ParseIntPipe) id: number) {
    this.tarefasService.remove(id);
  }
}
