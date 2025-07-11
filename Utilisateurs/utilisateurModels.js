import mongoose from "mongoose";
import Profile from "../Profile/profileModels.js";

const utilisateurSchema = new mongoose.Schema(
  {
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: {
      type: String,
      required: [true, "Mot de passe requis"],
      trim: true,
      minlength: [8, "Au moins 8 caractères requis"],
    },
    adresse: { type: String, required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  },
  { timestamps: true }
);

utilisateurSchema.pre("findOneAndDelete", async function (next) {
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
