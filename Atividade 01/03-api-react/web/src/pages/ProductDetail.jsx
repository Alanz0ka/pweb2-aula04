import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { buscarProduto } from "../api.js";

// Tela de DETALHE. Lê o :id da URL e pede aquele produto à API.
export default function ProductDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    setCarregando(true);
    setErro(false);
    buscarProduto(id)
      .then((dados) => setProduto(dados))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return <div className="wrap"><p>Carregando...</p></div>;
  }

  if (erro) {
    return (
      <div className="wrap">
        <p>Produto não encontrado.</p>
        <Link className="voltar" to="/">← Voltar para a listagem</Link>
      </div>
    );
  }

  return (
    <div className="wrap">
      <Nav />
      <span className="badge">Projeto 3 · React + API</span>
      <br />
      <Link className="voltar" to="/">← Voltar para a listagem</Link>

      <div className="detalhe">
        <div className="emoji-lg">{produto.emoji}</div>
        <div className="info">
          <span className="cat">{produto.categoria}</span>
          <h1>{produto.nome}</h1>
          <p className="desc">{produto.descricao}</p>
          <p className="preco-lg">
            R$ {produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <p className="estoque">{produto.estoque} unidades em estoque</p>
        </div>
      </div>
    </div>
  );
}
