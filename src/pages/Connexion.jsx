import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router";

export default function Connexion() {
  const { estConnecte, seConnecter } = useOutletContext();
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState("");

  if (estConnecte) {
    return <Navigate to="/mon-espace" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!nom.trim()) {
      setErreur("Veuillez saisir votre nom ou prénom pour vous connecter.");
      return;
    }
    setErreur("");
    seConnecter(nom.trim());
    navigate("/mon-espace", { replace: true });
  }

  return (
    <section className="page page-connexion">
      <h1>Connexion</h1>
      <p>Connexion simulée pour accéder à votre espace étudiant.</p>

      <form onSubmit={handleSubmit} className="formulaire-connexion">
        <label htmlFor="nom-etudiant">Nom d'utilisateur</label>
        <input
          id="nom-etudiant"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Ex. Aminata"
        />

        {erreur && <p className="message-erreur">{erreur}</p>}

        <button type="submit">Se connecter</button>
      </form>
    </section>
  );
}