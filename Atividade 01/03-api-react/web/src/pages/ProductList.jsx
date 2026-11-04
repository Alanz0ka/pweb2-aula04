import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { listarProdutos } from "../api.js";

// Tela de LISTAGEM. Ela não tem os dados prontos: pede à API quando monta.
export default function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listarProdutos()
      .then((dados) => setProdutos(dados))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <div className="wrap"><p>Carregando produtos...</p></div>;
  }

  return (
    <div className="wrap">
      <Nav />
      <span className="badge">Projeto 3 · React + API</span>
      <h1>🛒 Loja Web 2</h1>
      <p className="sub">
        O React montou esta tela no navegador com os dados que a API devolveu em JSON.
      </p>

      <div className="grid">
        {produtos.map((p) => (
          // Link do react-router: troca de tela sem recarregar a página.
          <Link key={p.id} className="card" to={`/produtos/${p.id}`}>
            <div className="emoji">{p.emoji}</div>
            <span className="cat">{p.categoria}</span>
            <p className="nome">{p.nome}</p>
            <p className="preco">
              R$ {p.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
