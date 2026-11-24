# Teranga Blog

Application web multipage réalisée avec React et Vite. Elle permet de consulter des articles, filtrer par titre, découvrir les auteurs et leurs publications, ajouter des commentaires, gérer une liste de favoris partagée et accéder à l'espace étudiant (`/mon-espace`) après connexion simulée (`/connexion`).

## Comment lancer le projet

1. Cloner le dépôt :

```bash
git clone https://github.com/mariemediack2017-maker/teranga-blog.git
cd teranga-blog
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
```

## Trois choses que j'ai apprises

1. **Navigation et partage d'état avec React Router** : structurer les routes avec un layout (`Outlet`), gérer les paramètres d'URL (`useParams`), protéger une route et partager l'état des favoris entre les pages.

2. **Chargement de données et gestion des états** : utiliser `useEffect` et `fetch` pour récupérer les données, gérer le chargement, les erreurs et les cas où une ressource n'existe pas.

3. **Organisation en composants et formulaires contrôlés** : découper l'interface en composants réutilisables et valider les champs d'un formulaire avant d'ajouter un commentaire.
