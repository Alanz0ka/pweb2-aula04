import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CORES_PROJETO, CorProjeto } from '../entities/projeto.entity';

// Formato esperado do corpo ao criar um projeto.
export class CreateProjetoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @MaxLength(60, { message: 'O nome deve ter no máximo 60 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  @MaxLength(200, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  descricao?: string;

  @IsIn(CORES_PROJETO, { message: `A cor deve ser uma de: ${CORES_PROJETO.join(', ')}.` })
  cor: CorProjeto;
}
