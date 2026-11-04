import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { listarCategorias } from "../api.js";

// Tela de LISTAGEM DE CATEGORIAS — já pronta.
// Consome GET /api/categorias (endpoint que os alunos vão criar no exercício).
export default function CategoryList() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    listarCategorias()
      .then((dados) => setCategorias(dados))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="wrap">
      <Nav />
      <span className="badge">Projeto 3 · React + API</span>
      <h1>🗂️ Categorias</h1>
      <p className="sub">As categorias abaixo vêm da API (GET /api/categorias).</p>

      {carregando && <p>Carregando categorias...</p>}

      {erro && (
        <div className="erro-box">
          <strong>Não foi possível carregar as categorias.</strong>
          <p>
            Você já implementou o endpoint <code>GET /api/categorias</code> na API
            do Projeto 3? Assim que ele existir, esta tela funciona.
          </p>
        </div>
      )}

      {!carregando && !erro && (
        <div className="grid">
          {categorias.map((c) => (
            <Link key={c.id} className="card" to={`/categorias/${c.id}`}>
              <div className="emoji">{c.emoji}</div>
              <p className="nome">{c.nome}</p>
              <p className="sub-card">{c.descricao}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
