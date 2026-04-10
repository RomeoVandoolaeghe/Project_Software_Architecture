# Software Architecture - Blogging Platform API

## Project Description

This project is a RESTful API for a blogging platform built with NestJS. The application strictly adheres to Clean Architecture principles, ensuring a clear separation of concerns among the Domain, Application, and Infrastructure layers. It features user authentication via JWT, post management, tagging, commenting, user subscriptions, and an event-driven notification system. Data persistence is handled using TypeORM with an SQLite database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher is recommended)
- npm (Node Package Manager)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running:
   ```bash
   npm install
   ```
4. Créez votre fichier de variables d'environnement à partir de l'exemple fourni :
   ```bash
   cp .env.example .env
   ```
5. Démarrez l'application en mode développement :
   ```bash
   npm run start:dev
   ```

Lors du premier lancement, la base de données SQLite ainsi que toutes les tables nécessaires seront automatiquement générées.

## Documentation de l'API

La documentation complète et interactive de l'API est générée avec Swagger.

Une fois l'application démarrée en local, vous pouvez consulter la liste exhaustive des points de terminaison (endpoints) et les tester directement via l'interface web à l'adresse suivante :

http://localhost:3000/api

## Tests

Le projet inclut des suites de tests automatisés pour valider la logique métier et les routes de l'API.

Pour exécuter les tests unitaires :
   ```bash
   npm run test
   ```

Pour exécuter les tests de bout en bout :
   ```bash
   npm run test:e2e
   ```




