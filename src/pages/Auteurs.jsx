import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";

export default function Auteurs() {
  const [auteurs, setAuteurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function chargerAuteurs() {
      setChargement(true);
      setErreur(null);

      try {
        const response = await fetch(`${API_URL}/users`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setAuteurs(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErreur(err.message || "Impossible de charger les auteurs.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerAuteurs();

    return () => controller.abort();
  }, []);

  return (
    <section className="page page-auteurs">
      <h1>Auteurs</h1>

      <EtatRequete chargement={chargement} erreur={erreur}>
        <ul className="liste-auteurs">
          {auteurs.map((auteur) => (
            <li key={auteur.id} className="carte-auteur">
              <h2>
                <Link to={`/auteurs/${auteur.id}`}>{auteur.name}</Link>
              </h2>
              <p>@{auteur.username}</p>
              <p>{auteur.email}</p>
              {auteur.company?.name && <p>Organisation : {auteur.company.name}</p>}
            </li>
          ))}
        </ul>
      </EtatRequete>
    </section>
  );
}