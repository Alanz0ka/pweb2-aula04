import { IsEmail, IsString, MinLength } from 'class-validator';

// Credenciais usadas no cadastro e no login.
export class AuthDto {
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres.' })
  senha: string;
}
