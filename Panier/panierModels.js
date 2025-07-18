import mongoose from "mongoose";

const panierSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },

  p_ids_produits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produit" }],

  // p_id_type_paiement: { type: String }, // relation object id vers type de paiement

  p_date: { type: Date },
  p_totale: { type: Number, required: true },
});

if (mongoose.models.Panier) {
  delete mongoose.models.Panier;
} // supp si existe
const Panier = mongoose.model("Panier", panierSchema);

export default Panier;
