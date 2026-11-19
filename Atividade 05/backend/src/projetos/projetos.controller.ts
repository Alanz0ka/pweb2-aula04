import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

// Rotas em /api/projetos (prefixo global 'api').
// Todas as rotas exigem um JWT válido no cookie (401 sem login).
@UseGuards(JwtAuthGuard)
@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Get()
  findAll() {
    return this.projetosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projetosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProjetoDto) {
    return this.projetosService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjetoDto) {
    return this.projetosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projetosService.remove(id);
  }
}
