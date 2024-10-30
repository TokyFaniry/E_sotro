
## INSTALLATION

## Table des Matières
- [Prérequis](#prérequis)
- [Installation](#installation)
  - [Étape 1 : Importer la Base de Données](#étape-1--importer-la-base-de-données)
  - [Étape 2 : Configurer les Paramètres de Connexion à la Base de Données](#étape-2--configurer-les-paramètres-de-connexion-à-la-base-de-données)
  - [Étape 3 : Lancer le Client](#étape-3--lancer-le-client)
  - [Étape 4 : Lancer le Serveur](#étape-4--lancer-le-serveur)
  - [Étape 5 : Vérification Finale](#étape-5--vérification-finale)
- [Résolution des Problèmes](#résolution-des-problèmes)
- [Support Technique](#support-technique)

---

## Prérequis

Assurez-vous que les éléments suivants sont installés sur votre machine :
- **Node.js** (version 14 ou plus)
- **npm** (inclus avec Node.js)
- **MySQL** (ou un serveur local comme **XAMPP** ou **WAMP** pour gérer la base de données)
- **Git** (pour cloner le projet, si nécessaire)

## Installation
### Étape 0 : déplacer le projet dans dossier d'outil MySql (WAMP, XAMP ...) 
### Étape 1 : Importer la Base de Données

1. Ouvrez votre gestionnaire de base de données (phpMyAdmin si vous utilisez XAMPP ou WAMP, ou tout autre outil MySQL).
2. Créez une nouvelle base de données pour le projet, par exemple : `sotro`.
3. Importez le fichier SQL de la base de données :
   - Allez dans l’onglet **Importer** dans phpMyAdmin.
   - Sélectionnez le fichier `.sql` et cliquez sur **Exécuter**.
4. Vérifiez que toutes les tables sont bien importées dans la base de données.

### Étape 2 : Configurer les Paramètres de Connexion à la Base de Données

1. Ouvrez le dossier **server** du projet (backend Node.js).
2. Localisez le fichier de configuration (`config.js`, `.env`, ou similaire).
3. Mettez à jour les informations de connexion à la base de données :
   ```bash
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=sotro
   ```
   Remplacez `your_mysql_user` et `your_mysql_password` par vos informations MySQL.

### Étape 3 : Lancer le Client

1. Dans le terminal, naviguez vers le dossier **client** du projet :
   ```bash
   cd client
   ```
2. Installez les dépendances et démarrez le client :
   - Si `vite` est installé, tapez simplement :
     ```bash
     vite
     ```
   - Sinon, exécutez :
     ```bash
     npm install
     npm run dev
     ```
3. Le client est maintenant accessible sur [http://localhost:5173](http://localhost:5173).

### Étape 4 : Lancer le Serveur

1. Dans un nouveau terminal, naviguez vers le dossier **server** du projet :
   ```bash
   cd server
   ```
2. Installez les dépendances backend :
   ```bash
   npm install
   ```
3. Démarrez le serveur :
   ```bash
   node Server.js
   ```
4. Le serveur est actif et accessible depuis [http://localhost:8082](http://localhost:8082).

### Étape 5 : Vérification Finale

1. **Client** : Accédez à [http://localhost:5173](http://localhost:5173) dans un navigateur.
2. **Serveur** : Assurez-vous que le serveur Node.js fonctionne en testant une route API, par exemple `/api/products`, qui devrait renvoyer des données JSON.
3. **Base de Données** : Vérifiez la connexion entre le serveur Node.js et MySQL en affichant des données dans le client.

---

## Résolution des Problèmes

- **Problème de connexion à MySQL** :
  - Vérifiez que MySQL est en cours d'exécution.
  - Assurez-vous que les informations de connexion dans `config.js` ou `.env` sont correctes.
- **Erreur lors de l'installation des dépendances** :
  - Vérifiez que Node.js et npm sont bien installés et à jour.
- **Port déjà utilisé** :
  - Si le port par défaut est occupé, modifiez le port dans les fichiers de configuration pour le client et/ou le serveur.

## Support Technique

Pour toute question ou problème supplémentaire, veuillez contacter l’équipe de développement.

---

Ce guide devrait vous permettre d’installer et de lancer le projet sur votre machine locale. Profitez de la plateforme de vente de rhums à Madagascar !