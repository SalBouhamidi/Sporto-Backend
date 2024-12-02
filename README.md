# Sporto - Application de Gestion d'Événements Sportifs

Une organisation sportive souhaite mettre en place une application pour gérer les inscriptions à ses événements. Cette application permettra à l’organisateur de gérer les événements et les participants, tout en simplifiant le processus d'inscription.

---

## **Fonctionnalités**

### **Organisateur peut :**
- **Gérer les événements sportifs :** Création, modification, et suppression.
- **Gérer les inscriptions aux événements :** Création et modification des informations pour chaque participant.
- **Générer et imprimer une liste des inscrits :** Liste complète des participants pour chaque événement.

---
## **API Documentation **:
https://documenter.getpostman.com/view/33158402/2sAYBYfqJw

## **Architecture du Projet**
Modular Architecture of Nest js .
|_node_modules
|_src
  |_auth
    |_DTOs
    |_auth.controller.spec.ts
    |_auth.controller.ts
    |_auth.module.ts
    |_auth.service.spec.ts
    |_auth.service.ts
  |_events
    |_DTOs
    |_event.controller.spec.ts
    |_event.controller.ts
    |_event.module.ts
    |_event.service.spec.ts
    |_event.service.ts
    |_event.schema.ts
  |_Participents
    |_DTOs
    |participents.controller.spec.ts
    |participents.controller.ts
    |participents.module.ts
    |participents.service.spec.ts
    |participents.service.ts
    |participents.schema.ts
  |_Users
    |_DTOs
    |_user.controller.spec.ts
    |_user.controller.ts
    |_user.module.ts
    |_user.service.spec.ts
    |_user.service.ts
    |_user.schema.ts
  |_utils
    |_BcyptingPassword.ts
    |_checkPassword.ts
    |_validateJWT.ts
  |_app.controller.spec.ts
  |_app.controller.ts
  |_app.module.ts
  |_app.service.ts
  |_main.ts
  |_Test
    |_app.e2e-spec.ts
    |_jest-e2e.json
  |_.dockerignore
  |_.env
  |_.eslintrc.js
  |_.gitignore
  |_dockerfile
  |_nest-cli.json
  |_package.json
  |_package-lock.json
  |_tsconfig.build.json
  |_tsconfig.json
  |_README.md

### **Back-end**
- **Technologies :** Node.js, NestJS, MongoDB.
- **ODM :** Mongoose.
- **Tests unitaires :** Implémentés pour chaque contrôleur.
- **Middleware :** 
  - Gestion des erreurs.
  - Authentification et sécurité avec JWT.
- **Protection des routes sensibles :** Système d'autorisation basé sur les rôles.

### **Front-end**
- **Framework :** React.js.
- **Gestion des routes :** 
  - Protection des routes sensibles contre l'accès non autorisé.

### **Déploiement**
- **Docker :** 
  - Génération d'images Docker pour le Back-end et le Front-end.
  - Création d'un réseau Docker pour connecter les deux.
  
---

## **Configuration du Projet**

### **Scripts Utiles**
- **Lancer l'application :**
  - `npm run start:dev` : Démarre l'application en mode développement.
  - `npm run start:prod` : Démarre l'application en mode production.
- **Tests :**
  - `npm run test` : Exécute les tests unitaires.
  - `npm run test:watch` : Exécute les tests en mode surveillance.
  - `npm run test:cov` : Génére un rapport de couverture des tests.
- **Linting :**
  - `npm run lint` : Analyse le code et corrige les erreurs de style.
- **Compilation :**
  - `npm run build` : Compile l'application pour la production.

### **Dépendances Principales**
- **Authentification et sécurité :**
  - `@nestjs/jwt`, `jsonwebtoken`, `bcrypt`.
- **Validation et transformation :**
  - `class-validator`, `class-transformer`.
- **Base de données :**
  - `mongoose`, `@nestjs/mongoose`.
- **Test :**
  - `jest`, `supertest`, `ts-jest`.

---

## **Instructions d'Installation**

1. **Cloner le dépôt :**
   git clone https://github.com/SalBouhamidi/Sporto-Backend.git


2. **Installer les dépendances:**
npm install

3. **Configurer les variables d'environnement:**

PORT=3000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret_key

3. **Démarrer l'application:**

npm run start:dev

4. **Exécuter les tests :**

npm run test

### Créer une image Docker pour le Back-end :
docker build -t userName/docker-img-spoto-backend:latest .
### Créer une image Docker pour le Front-end :
docker build -t username/frontend-app .
### Pour savoir plus sur Docker compose visiter le repo:
https://github.com/SalBouhamidi/sportoDocker.git

Made With Love by Salima BOUHAMIDI.










