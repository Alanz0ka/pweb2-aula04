import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';

// @Controller('tarefas') + prefixo global 'api' => rotas em /api/tarefas.
// Todas as rotas exigem um JWT válido no cookie (401 sem login).
@UseGuards(JwtAuthGuard)
@Controller('tarefas')
export class TarefasController {
  // Injeção de dependência: o Nest entrega uma instância de TarefasService.
  constructor(private readonly tarefasService: TarefasService) {}

  // GET /api/tarefas?projetoId=1 filtra as tarefas de um projeto (desafio).
  @Get()
  // Os métodos retornam Promise: o Nest aguarda o banco antes de responder.
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
  // O e-mail do usuário logado (lido do JWT) recebe o aviso de tarefa criada.
  create(@Body() dto: CreateTarefaDto, @Req() req: Request) {
    const usuario = req.user as { userId: number; email: string };
    return this.tarefasService.create(dto, usuario?.email);
  }

  // POST /api/tarefas/:id/anexo  (multipart/form-data, campo "arquivo")
  // Sem "storage" no interceptor, o arquivo fica em memória (arquivo.buffer)
  // e segue para o bucket do Supabase. O ParseFilePipe valida tamanho (5 MB) e
  // tipo e responde 400. O limite de 20 MB do Multer é só um teto de memória:
  // acima dele a requisição é recusada antes de ler o arquivo inteiro (413).
  @Post(':id/anexo')
  @UseInterceptors(FileInterceptor('arquivo', { limits: { fileSize: 20 * 1024 * 1024 } }))
  anexar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^(image\/(png|jpe?g|webp|gif)|application\/pdf)$/ }),
        ],
      }),
    )
    arquivo: Express.Multer.File,
  ) {
    return this.tarefasService.anexar(id, arquivo);
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
    return this.tarefasService.remove(id);
  }
}
