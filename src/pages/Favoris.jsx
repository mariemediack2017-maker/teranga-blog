import { Link, useOutletContext } from "react-router";
import ListeArticles from "../components/ListeArticles";

export default function Favoris() {
  const { favoris, onToggleFavori } = useOutletContext();

  return (
    <section className="page page-favoris">
      <h1>Mes favoris ({favoris.length})</h1>

      {favoris.length === 0 ? (
        <div className="etat-vide">
          <p>Vous n'avez pas encore ajouté d'article en favori.</p>
          <Link to="/articles">Parcourir les articles</Link>
        </div>
      ) : (
        <ListeArticles
          articles={favoris}
          favoris={favoris}
          onToggleFavori={onToggleFavori}
        />
      )}
    </section>
  );
}