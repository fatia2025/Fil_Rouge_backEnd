import mongoose from "mongoose";
import Profile from "../Profile/profileModels.js";

import Panier from "../Panier/panierModels.js";

const utilisateurSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: {
      type: String,
      required: [true, "Mot de passe requis"],
      trim: true,
      minlength: [8, "Au moins 8 caractères requis"],
    },

    adresse: { type: String, required: false }, // avant c'etait True

    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },

    panier: { type: mongoose.Schema.Types.ObjectId, ref: "Panier" }, // ajout panier comme profil
  },
  { timestamps: true }
);

utilisateurSchema.pre("findOneAndDelete", async function (next) {
  // code exécuté avant la suppression d’un document avec findOneAndDelete
  try {
    const utilisateur = await this.model.findOne(this.getFilter());
    if (utilisateur?.profile) {
      await Profile.findByIdAndDelete(utilisateur.profile);
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;
