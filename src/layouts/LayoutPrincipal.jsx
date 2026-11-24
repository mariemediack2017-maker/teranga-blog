import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

export default function LayoutPrincipal() {
  const [favoris, setFavoris] = useState([]);
  const [estConnecte, setEstConnecte] = useState(false);
  const [utilisateur, setUtilisateur] = useState("");

  function onToggleFavori(article) {
    setFavoris((prev) => {
      const existe = prev.some((item) => item.id === article.id);
      if (existe) {
        return prev.filter((item) => item.id !== article.id);
      }
      return [...prev, article];
    });
  }

  function seConnecter(nom) {
    setUtilisateur(nom);
    setEstConnecte(true);
  }

  function seDeconnecter() {
    setEstConnecte(false);
    setUtilisateur("");
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <Link to="/" className="brand">
          <img
            src="/logo-teranga-blog.png"
            alt="Logo Teranga Blog"
            className="brand-logo"
          />
          <span>Teranga Blog</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <NavLink to="/auteurs">Auteurs</NavLink>
          <NavLink to="/favoris">Favoris ({favoris.length})</NavLink>
          <NavLink to="/mon-espace">Mon espace</NavLink>
          {estConnecte ? (
            <button type="button" onClick={seDeconnecter}>
              Déconnexion ({utilisateur})
            </button>
          ) : (
            <NavLink to="/connexion">Connexion</NavLink>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet
          context={{
            favoris,
            onToggleFavori,
            estConnecte,
            utilisateur,
            seConnecter,
            seDeconnecter,
          }}
        />
      </main>
    </div>
  );
}