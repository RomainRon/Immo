const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  caracteristique: {
    type: String,
    required: true,
  },
});

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
