export default function BarreRecherche({
  valeur,
  onChanger,
  placeholder = "Rechercher...",
}) {
  return (
    <div className="barre-recherche">
      <label htmlFor="champ-recherche">Recherche par titre</label>
      <input
        id="champ-recherche"
        type="search"
        value={valeur}
        onChange={(e) => onChanger(e.target.value)}
        placeholder={placeholder}
      />
      {valeur && (
        <button type="button" onClick={() => onChanger("")}>
          Effacer
        </button>
      )}
    </div>
  );
}