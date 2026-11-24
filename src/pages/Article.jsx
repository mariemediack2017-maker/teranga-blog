import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import CommentaireForm from "../components/CommentaireForm";
import ListeCommentaires from "../components/ListeCommentaires";

const ARTICLES_FR = [
  {
    title: "Démarrer avec React 19 et Vite",
    body: "Découvrez comment structurer une application moderne avec des composants fonctionnels, un état clair et une navigation fluide. Chaque composant reste simple, lisible et réutilisable dans l'application.",
  },
  {
    title: "Comprendre useEffect et AbortController",
    body: "Apprenez à charger des données distantes proprement, gérer les erreurs HTTP et éviter les conflits lors d'un changement d'identifiant grâce à l'annulation des requêtes en cours.",
  },
  {
    title: "Organiser ses routes avec React Router",
    body: "Utilisez un layout parent avec Outlet, des NavLink actifs et des paramètres d'URL pour naviguer sans rechargement de page tout en conservant l'état partagé.",
  },
  {
    title: "Formulaires contrôlés et validation en React",
    body: "Maîtrisez les champs liés à l'état, la vérification des saisies avant soumission et la mise à jour immédiate de la liste des commentaires.",
  },
  {
    title: "Partager l'état avec useOutletContext",
    body: "Faites remonter vos données au layout parent pour conserver vos favoris pendant toute la navigation sans rechargement ni perte d'information.",
  },
  {
    title: "Soigner l'expérience utilisateur et la 404",
    body: "Affichez des messages clairs pendant le chargement ou en cas d'erreur, et prévoyez une page dédiée pour les adresses inconnues.",
  },
];

function adapterArticleEnFrancais(article) {
  const index = (Number(article.id) - 1 + ARTICLES_FR.length) % ARTICLES_FR.length;
  const modele = ARTICLES_FR[index];
  return {
    ...article,
    title: `${modele.title} #${article.id}`,
    body: modele.body,
  };
}

export default function Article() {
  const { id } = useParams();
  const { favoris, onToggleFavori } = useOutletContext();

  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerDetail() {
      setChargement(true);
      setErreur(null);
      setArticle(null);
      setCommentaires([]);

      try {
        const [resArticle, resCommentaires] = await Promise.all([
          fetch(`${API_URL}/posts/${id}`, { signal: controller.signal }),
          fetch(`${API_URL}/posts/${id}/comments`, {
            signal: controller.signal,
          }),
        ]);

        if (!resArticle.ok) {
          throw new Error(
            resArticle.status === 404
              ? "Article introuvable."
              : `Erreur HTTP ${resArticle.status}`
          );
        }
        if (!resCommentaires.ok) {
          throw new Error(
            `Erreur lors du chargement des commentaires (${resCommentaires.status})`
          );
        }

        const dataArticle = await resArticle.json();
        const dataCommentaires = await resCommentaires.json();

        setArticle(adapterArticleEnFrancais(dataArticle));
        setCommentaires(dataCommentaires);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErreur(err.message || "Impossible de charger l'article.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerDetail();

    return () => controller.abort();
  }, [id]);

  function ajouterCommentaire({ name, email, body }) {
    const nouveauCommentaire = {
      id: Date.now(),
      postId: Number(id),
      name,
      email: email || "lecteur@teranga.sn",
      body,
    };
    setCommentaires((prev) => [nouveauCommentaire, ...prev]);
  }

  const estFavori = article
    ? favoris.some((item) => item.id === article.id)
    : false;

  return (
    <section className="page page-article">
      <Link to="/articles">← Retour aux articles</Link>

      <EtatRequete chargement={chargement} erreur={erreur}>
        {article && (
          <>
            <article className="article-detail">
              <h1>{article.title}</h1>
              <p className="article-meta">
                Auteur :{" "}
                <Link to={`/auteurs/${article.userId}`}>
                  Voir la fiche auteur #{article.userId}
                </Link>
              </p>
              <p className="article-corps">{article.body}</p>

              <button
                type="button"
                onClick={() => onToggleFavori(article)}
                className="btn-favori"
              >
                {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
              </button>
            </article>

            <section className="commentaires-section">
              <h2>Commentaires ({commentaires.length})</h2>
              <CommentaireForm onAjouter={ajouterCommentaire} />
              <ListeCommentaires commentaires={commentaires} />
            </section>
          </>
        )}
      </EtatRequete>
    </section>
  );
}