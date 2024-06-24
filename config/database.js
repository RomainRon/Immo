
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.Mongo_DB;

const connectDatabase = async () => {
    // TODO: Connexion à la base de données MongoDB
    // Utilisez les variables d'environnement pour la configuration
    // et referez-vous à la documentation de Mongoose
    // Utilisez un try/catch pour gérer les erreurs et n'oublier pas d'ajouter un log pour le serveur
    try {
      await mongoose.connect(uri);
      console.log("Connected to the database");
    }
      catch (error) {
          console.error("Error connecting to the database", error);
      }
  
  };
  connectDatabase()
  
  module.exports = connectDatabase;
  