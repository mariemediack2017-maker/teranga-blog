import { Link } from "react-router";

export default function Introuvable() {
  return (
    <section className="page page-404">
      <h1>404 — Page introuvable</h1>
      <p>L'adresse demandée n'existe pas ou a été déplacée.</p>
      <Link to="/" className="btn">
        Retour à l'accueil
      </Link>
    </section>
  );
}