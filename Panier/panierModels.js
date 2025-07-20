import mongoose from "mongoose";

const panierSchema = new mongoose.Schema({
  // a supprimer-- p_ids_produits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produit" }],

  // tableau d'ObjectId
  p_ids_produits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produit" }], // il faut absolument mettre ref celui qui fait relation table Produit. ici tableau : plusieurs articles

  // p_id_type_paiement: { type: String }, // relation object id vers type de paiement à ajouter plutard

  p_date: { type: Date },
  p_totale: { type: Number, required: true },
  ajoutProduitPanier: { type: Boolean, default: false }, // <--- ajout produit au panier
});
// supprimer model schema si existe avant avec marine ----------------
if (mongoose.models.Panier) {
  delete mongoose.models.Panier;
}
// ------------------------------------------------
const Panier = mongoose.model("Panier", panierSchema);

export default Panier;
