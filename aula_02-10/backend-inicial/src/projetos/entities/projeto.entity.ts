// Cores aceitas para um projeto.
export const CORES_PROJETO = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo'] as const;
export type CorProjeto = (typeof CORES_PROJETO)[number];

// Representa um projeto na nossa "base em memória".
export class Projeto {
  id: number;
  nome: string;
  descricao?: string;
  cor: CorProjeto;
}
