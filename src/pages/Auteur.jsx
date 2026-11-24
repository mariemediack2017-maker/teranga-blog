import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import ListeArticles from "../components/ListeArticles";

export default function Auteur() {
  const { id } = useParams();
  const { favoris, onToggleFavori } = useOutletContext();

  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerAuteurEtArticles() {
      setChargement(true);
      setErreur(null);
      setAuteur(null);
      setArticles([]);

      try {
        const [resAuteur, resArticles] = await Promise.all([
          fetch(`${API_URL}/users/${id}`, { signal: controller.signal }),
          fetch(`${API_URL}/posts?userId=${id}`, {
            signal: controller.signal,
          }),
        ]);

        if (!resAuteur.ok) {
          throw new Error(
            resAuteur.status === 404
              ? "Auteur introuvable."
              : `Erreur HTTP ${resAuteur.status}`
          );
        }
        if (!resArticles.ok) {
          throw new Error(
            `Erreur lors du chargement des articles (${resArticles.status})`
          );
        }

        const dataAuteur = await resAuteur.json();
        const dataArticles = await resArticles.json();

        setAuteur(dataAuteur);
        setArticles(dataArticles);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErreur(err.message || "Impossible de charger la fiche auteur.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerAuteurEtArticles();

    return () => controller.abort();
  }, [id]);

  return (
    <section className="page page-auteur">
      <Link to="/auteurs">← Tous les auteurs</Link>

      <EtatRequete chargement={chargement} erreur={erreur}>
        {auteur && (
          <>
            <div className="fiche-auteur">
              <h1>{auteur.name}</h1>
              <p>Pseudo : @{auteur.username}</p>
              <p>Email : {auteur.email}</p>
              {auteur.phone && <p>Téléphone : {auteur.phone}</p>}
              {auteur.company?.name && <p>Entreprise : {auteur.company.name}</p>}
            </div>

            <h2>Articles publiés ({articles.length})</h2>
            <ListeArticles
              articles={articles}
              favoris={favoris}
              onToggleFavori={onToggleFavori}
            />
          </>
        )}
      </EtatRequete>
    </section>
  );
}