import ArticleCard from "./ArticleCard";

export default function ListeArticles({ articles, favoris, onToggleFavori }) {
  if (!articles || articles.length === 0) {
    return <p>Aucun article à afficher.</p>;
  }

  return (
    <div className="liste-articles">
      {articles.map((article) => {
        const estFavori = favoris.some((item) => item.id === article.id);
        return (
          <ArticleCard
            key={article.id}
            article={article}
            estFavori={estFavori}
            onToggleFavori={onToggleFavori}
          />
        );
      })}
    </div>
  );
}