import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categories: { type: String, required: true },
  prix: { type: Number, required: true },
});

const Produit = mongoose.model("Produit", produitSchema);

export default Produit;
