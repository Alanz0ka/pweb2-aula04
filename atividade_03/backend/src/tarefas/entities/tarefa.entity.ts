import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Cada propriedade decorada com @Column vira uma coluna da tabela "tarefas".
@Entity('tarefas')
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @Column({ default: false })
  concluida: boolean;

  // Desafio da atividade 02: a tarefa pode pertencer a um projeto.
  @Column({ type: 'int', nullable: true })
  projetoId?: number;
}
