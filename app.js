const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const connectDatabase = require('./config/database');
const annoncesRouter = require('./routes/annonces'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

// Configuration de Mustache comme moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour le support des JSON et des formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données
connectDatabase();

// Définition des routes
app.use('/', annoncesRouter); // Utilisation correcte du routeur

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Exportation de l'application pour les tests et la modularisation
module.exports = app;
