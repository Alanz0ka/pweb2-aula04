// Segredo usado para assinar e validar o JWT.
// Em produção, defina a variável de ambiente JWT_SECRET.
export const JWT_SECRET = process.env.JWT_SECRET || 'segredo-da-aula';
