// Endereço da API (Projeto 3a). O React roda no navegador (porta 8094) e
// faz as requisições HTTP para cá (porta 8093).
const API_URL = "http://localhost:8093";

// Lista todos os produtos.
export async function listarProdutos() {
  const resposta = await fetch(`${API_URL}/api/produtos`);
  return resposta.json();
}

// Busca um produto pelo id. Se a API responder 404, lançamos um erro
// para a tela mostrar "não encontrado".
export async function buscarProduto(id) {
  const resposta = await fetch(`${API_URL}/api/produtos/${id}`);
  if (!resposta.ok) {
    throw new Error("Produto não encontrado");
  }
  return resposta.json();
}

// --- Categorias ---
// Estas telas já estão prontas. Elas chamam os endpoints que os alunos vão
// criar no exercício (GET /api/categorias e GET /api/categorias/:id).
// Enquanto esses endpoints não existirem, o fetch falha e a tela mostra um erro.

// Lista todas as categorias.
export async function listarCategorias() {
  const resposta = await fetch(`${API_URL}/api/categorias`);
  if (!resposta.ok) {
    throw new Error("Falha ao listar categorias");
  }
  return resposta.json();
}

// Busca uma categoria pelo id (esperada com seus produtos).
export async function buscarCategoria(id) {
  const resposta = await fetch(`${API_URL}/api/categorias/${id}`);
  if (!resposta.ok) {
    throw new Error("Categoria não encontrada");
  }
  return resposta.json();
}
