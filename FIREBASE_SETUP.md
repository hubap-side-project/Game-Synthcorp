# Configuration Firebase — SYNTHCORP

## Prérequis
Un compte Google suffit. Le plan **Spark (gratuit)** couvre largement les besoins d'un jeu idle.

---

## Étape 1 — Créer un projet Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquer **"Créer un projet"**
3. Donner un nom (ex: `synthcorp-game`)
4. Désactiver Google Analytics (inutile ici) → **Créer le projet**

---

## Étape 2 — Ajouter une application Web

1. Sur la page d'accueil du projet, cliquer l'icône **`</>`** (Web)
2. Donner un surnom à l'app (ex: `synthcorp-web`)
3. **Ne pas** cocher "Firebase Hosting"
4. Cliquer **"Enregistrer l'application"**
5. Firebase affiche un bloc `firebaseConfig` — **copier ces valeurs**, elles seront utilisées à l'étape 4

```js
// Exemple de ce que vous allez voir :
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "synthcorp-game.firebaseapp.com",
  databaseURL: "https://synthcorp-game-default-rtdb.firebaseio.com",
  projectId: "synthcorp-game",
  storageBucket: "synthcorp-game.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Étape 3 — Activer la Realtime Database

1. Dans le menu gauche : **Build → Realtime Database**
2. Cliquer **"Créer une base de données"**
3. Choisir une région (ex: `europe-west1` pour la France)
4. Sélectionner **"Démarrer en mode test"** → Suivant → Terminer

### Ouvrir les règles d'accès

1. Aller dans l'onglet **Règles** de la Realtime Database
2. Remplacer le contenu par :

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. Cliquer **"Publier"**

> **Note :** Ces règles sont ouvertes (lecture/écriture publique). Suffisant pour un jeu entre amis.
> Pour un accès public plus large, voir la section Sécurité avancée en bas de ce document.

---

## Étape 4 — Remplir firebase-config.js

Ouvrir le fichier `firebase-config.js` et remplacer chaque `REPLACE_WITH_...` par les valeurs copiées à l'étape 2 :

```js
const FIREBASE_CONFIG = {
  apiKey:            'AIzaSy...',
  authDomain:        'synthcorp-game.firebaseapp.com',
  databaseURL:       'https://synthcorp-game-default-rtdb.firebaseio.com',
  projectId:         'synthcorp-game',
  storageBucket:     'synthcorp-game.appspot.com',
  messagingSenderId: '123456789',
  appId:             '1:123456789:web:abc123',
};
```

> ⚠️ Le champ `databaseURL` est **obligatoire**. Il ressemble à
> `https://VOTRE-PROJET-default-rtdb.firebaseio.com`
> Si vous ne le voyez pas dans le bloc `firebaseConfig`, le trouver dans
> **Realtime Database → Données** (l'URL en haut de l'arbre).

---

## Étape 5 — Tester

1. Ouvrir `index.html` dans le navigateur
2. Ouvrir la console (F12) — vous devez voir :
   ```
   [SYNTHCORP] Firebase connecté ✓
   ```
3. Entrer votre nom dans le modal de démarrage
4. Jouer quelques secondes, puis ouvrir `leaderboard.html`
5. Votre score doit apparaître dans le classement

Pour vérifier que les données arrivent bien : dans la console Firebase → **Realtime Database → Données**, vous devez voir un nœud `synthcorp_scores` se former.

---

## Limites du plan gratuit (Spark)

| Ressource | Limite gratuite |
|---|---|
| Connexions simultanées | 100 |
| Stockage | 1 GB |
| Téléchargements | 10 GB/mois |
| Opérations | Illimitées |

Largement suffisant pour un jeu entre amis ou une petite communauté.

---

## Sécurité avancée (optionnel)

Les règles actuelles (`.read: true, .write: true`) permettent à n'importe qui de lire et écrire. Pour éviter qu'un joueur efface les scores des autres, vous pouvez restreindre l'écriture à son propre nœud :

```json
{
  "rules": {
    "synthcorp_scores": {
      ".read": true,
      "$playerId": {
        ".write": true
      }
    }
  }
}
```

> Cela autorise chaque joueur à écrire uniquement dans son propre entrée (`$playerId`), mais tout le monde peut lire le classement.
> Sans authentification Firebase, cette règle ne bloque pas un joueur malveillant qui connaîtrait l'ID d'un autre joueur — mais c'est suffisant pour un usage normal.
