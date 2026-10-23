import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Cores aceitas para um projeto.
export const CORES_PROJETO = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo'] as const;
export type CorProjeto = (typeof CORES_PROJETO)[number];

// Cada propriedade decorada com @Column vira uma coluna da tabela "projetos".
@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ type: 'varchar' })
  cor: CorProjeto;
}
