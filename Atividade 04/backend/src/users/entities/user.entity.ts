import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Tabela "usuarios": guarda o e-mail (único) e o HASH da senha.
@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string; // só o HASH (bcrypt), nunca a senha pura
}
