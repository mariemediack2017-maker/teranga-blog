export default function ListeCommentaires({ commentaires }) {
  if (!commentaires || commentaires.length === 0) {
    return <p>Aucun commentaire pour le moment.</p>;
  }

  return (
    <ul className="liste-commentaires">
      {commentaires.map((commentaire) => (
        <li key={commentaire.id} className="commentaire-item">
          <strong>{commentaire.name}</strong>
          {commentaire.email && (
            <span className="commentaire-email"> ({commentaire.email})</span>
          )}
          <p>{commentaire.body}</p>
        </li>
      ))}
    </ul>
  );
}