import { Link, Navigate, useOutletContext } from "react-router";

export default function MonEspace() {
  const { estConnecte, utilisateur, favoris, seDeconnecter } =
    useOutletContext();

  if (!estConnecte) {
    return <Navigate to="/connexion" replace />;
  }

  return (
    <section className="page page-mon-espace">
      <h1>Mon espace</h1>
      <p>Bonjour {utilisateur || "étudiant(e)"} !</p>
      <p>
        Vous avez actuellement <strong>{favoris.length}</strong> article(s) en
        favori.
      </p>

      <div className="actions-espace">
        <Link to="/favoris">Voir mes favoris</Link>
        <button type="button" onClick={seDeconnecter}>
          Se déconnecter
        </button>
      </div>
    </section>
  );
}