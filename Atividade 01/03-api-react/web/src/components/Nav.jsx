import { NavLink } from "react-router-dom";

// Menu de navegação da SPA. Troca entre as telas sem recarregar a página.
// A classe "ativo" marca o link da tela atual.
export default function Nav() {
  const classe = ({ isActive }) => (isActive ? "nav-link ativo" : "nav-link");

  return (
    <nav className="nav">
      <NavLink to="/" end className={classe}>
        Produtos
      </NavLink>
      <NavLink to="/categorias" className={classe}>
        Categorias
      </NavLink>
    </nav>
  );
}
