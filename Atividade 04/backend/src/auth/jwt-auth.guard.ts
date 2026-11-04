import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard que exige um JWT válido (estratégia 'jwt').
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
