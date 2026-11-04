import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { buscarCategoria } from "../api.js";

// Tela de DETALHE DA CATEGORIA — já pronta.
// Consome GET /api/categorias/:id, que deve devolver a categoria E seus produtos.
export default function CategoryDetail() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    setCarregando(true);
    setErro(false);
    buscarCategoria(id)
      .then((dados) => setCategoria(dados))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, [id]);

  return (
    <div className="wrap">
      <Nav />
      <Link className="voltar" to="/categorias">← Voltar para categorias</Link>

      {carregando && <p>Carregando...</p>}

      {erro && (
        <div className="erro-box">
          <strong>Não foi possível carregar esta categoria.</strong>
          <p>
            Confira se o endpoint <code>GET /api/categorias/:id</code> já devolve a
            categoria com a lista de <code>produtos</code> dela.
          </p>
        </div>
      )}

      {categoria && (
        <>
          <div className="detalhe">
            <div className="emoji-lg">{categoria.emoji}</div>
            <div className="info">
              <span className="badge">Categoria</span>
              <h1>{categoria.nome}</h1>
              <p className="desc">{categoria.descricao}</p>
            </div>
          </div>

          <h2 className="secao">Produtos desta categoria</h2>
          <div className="grid">
            {/* A categoria traz seus produtos; cada card leva ao detalhe do produto. */}
            {(categoria.produtos ?? []).map((p) => (
              <Link key={p.id} className="card" to={`/produtos/${p.id}`}>
                <div className="emoji">{p.emoji}</div>
                <p className="nome">{p.nome}</p>
                <p className="preco">
                  R$ {p.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
