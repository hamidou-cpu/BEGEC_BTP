# BEGEC TP

## Installation et lancement en local

### Prérequis

- Node.js 20.20 ou plus récent
- npm 10 ou plus récent
- PostgreSQL installé et démarré

### Étapes

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Copier `.env.example` vers `.env`.

   macOS / Linux :

   ```bash
   cp .env.example .env
   ```

   Windows PowerShell :

   ```powershell
   Copy-Item .env.example .env
   ```

3. Créer une base PostgreSQL vide nommée `begectp`, puis modifier `DATABASE_URL` dans `.env` avec le nom d’utilisateur, le mot de passe et le port de votre PostgreSQL local.

4. Créer les tables dans cette base :

   ```bash
   npm run db:push
   ```

   Cette commande synchronise le schéma Drizzle avec la base indiquée par `DATABASE_URL`. Utilisez une base locale vide ; ne la dirigez pas vers la base de production.

5. Démarrer le site et son API :

   ```bash
   npm run dev
   ```

   Ouvrez ensuite <http://localhost:5000>.

La base locale nouvellement créée ne contient pas les données de production. Les images téléversées localement sont enregistrées dans le dossier `uploads/`. Les paramètres SMTP sont facultatifs ; sans eux, les formulaires peuvent enregistrer leurs données en base, mais les courriels ne sont pas envoyés.

## Supabase

Cette configuration locale ne migre pas le backend vers Supabase. L’application utilise actuellement un serveur Express, Drizzle et PostgreSQL via `DATABASE_URL`. La connexion à une base Supabase ou le transfert de l’hébergement du backend et des fichiers nécessitera une étape distincte.
