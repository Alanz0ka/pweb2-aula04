import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

// Mesmos campos e validações de CreateProjetoDto, todos opcionais.
export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
