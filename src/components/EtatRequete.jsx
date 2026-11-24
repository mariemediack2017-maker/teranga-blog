export default function EtatRequete({ chargement, erreur, children }) {
  if (chargement) {
    return <p className="etat-chargement">Chargement en cours...</p>;
  }

  if (erreur) {
    return (
      <div className="etat-erreur" role="alert">
        <p>Une erreur est survenue : {erreur}</p>
      </div>
    );
  }

  return children;
}