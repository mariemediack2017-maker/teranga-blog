import { Link } from "react-router";

export default function ArticleCard({ article, estFavori, onToggleFavori }) {
  const extrait =
    article.body.length > 110
      ? `${article.body.slice(0, 110).trim()}...`
      : article.body;

  return (
    <article className="carte-article">
      <h3>
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h3>
      <p>{extrait}</p>
      <div className="carte-actions">
        <Link to={`/articles/${article.id}`}>Lire la suite</Link>
        <button type="button" onClick={() => onToggleFavori(article)}>
          {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
      </div>
    </article>
  );
}