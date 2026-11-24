import { useState } from "react";

export default function CommentaireForm({ onAjouter }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [erreur, setErreur] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim().length < 2) {
      setErreur("Veuillez saisir votre nom (au moins 2 caractères).");
      return;
    }

    if (body.trim().length < 5) {
      setErreur("Veuillez écrire un commentaire (au moins 5 caractères).");
      return;
    }

    setErreur("");
    onAjouter({
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    });

    setName("");
    setEmail("");
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit} className="commentaire-form">
      <h3>Ajouter un commentaire</h3>

      <div>
        <label htmlFor="commentaire-nom">Nom *</label>
        <input
          id="commentaire-nom"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="commentaire-email">Email (optionnel)</label>
        <input
          id="commentaire-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nom@exemple.com"
        />
      </div>

      <div>
        <label htmlFor="commentaire-message">Message *</label>
        <textarea
          id="commentaire-message"
          rows="4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Votre commentaire..."
        />
      </div>

      {erreur && <p className="erreur">{erreur}</p>}

      <button type="submit">Publier le commentaire</button>
    </form>
  );
}