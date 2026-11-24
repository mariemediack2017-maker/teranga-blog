import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import ListeArticles from "../components/ListeArticles";

const ARTICLES_FR = [
  {
    title: "Démarrer avec React 19 et Vite",
    body: "Découvrez comment structurer une application moderne avec des composants fonctionnels, un état clair et une navigation fluide.",
  },
  {
    title: "Comprendre useEffect et AbortController",
    body: "Apprenez à charger des données distantes proprement, gérer les erreurs HTTP et éviter les conflits lors d'un changement d'identifiant.",
  },
  {
    title: "Organiser ses routes avec React Router",
    body: "Utilisez un layout parent avec Outlet, des NavLink actifs et des paramètres d'URL pour naviguer sans rechargement de page.",
  },
  {
    title: "Formulaires contrôlés et validation en React",
    body: "Maîtrisez les champs liés à l'état, la vérification des saisies avant soumission et la mise à jour immédiate de l'interface.",
  },
  {
    title: "Partager l'état avec useOutletContext",
    body: "Faites remonter vos données au layout parent pour conserver vos favoris pendant toute la navigation sans rechargement.",
  },
  {
    title: "Soigner l'expérience utilisateur et la 404",
    body: "Affichez des messages clairs pendant le chargement ou en cas d'erreur, et prévoyez une page dédiée pour les adresses inconnues.",
  },
];

function adapterArticlesEnFrancais(articles) {
  return articles.map((article, index) => {
    const modele = ARTICLES_FR[index % ARTICLES_FR.length];
    return {
      ...article,
      title: `${modele.title} #${article.id}`,
      body: modele.body,
    };
  });
}

export default function Accueil() {
  const { favoris, onToggleFavori } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerAccueil() {
      setChargement(true);
      setErreur(null);

      try {
        const response = await fetch(`${API_URL}/posts?_limit=6`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setArticles(adapterArticlesEnFrancais(data));
      } catch (err) {
        if (err.name !== "AbortError") {
          setErreur(err.message || "Impossible de charger les articles.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerAccueil();

    return () => controller.abort();
  }, []);

  return (
    <section className="page page-accueil">
      <div className="hero">
        <h1>Bienvenue sur Teranga Blog</h1>
        <p>
          Découvrez les derniers articles partagés par la communauté de Teranga
          Academy.
        </p>
        <Link to="/articles" className="btn">
          Voir tous les articles
        </Link>
      </div>

      <h2>Derniers articles</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articles}
          favoris={favoris}
          onToggleFavori={onToggleFavori}
        />
      </EtatRequete>
    </section>
  );
}