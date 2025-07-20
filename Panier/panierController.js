import Panier from "./panierModels.js";

// CREATE (POST) -------------------------------------------

export const createPanier = async (req, res) => {
  try {
    console.log(" Création d'un nouveau panier ");
    console.log("panier", req.body);
    const panier = await Panier.create(req.body);

    res.status(201).json(panier);
    console.log(panier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du panier" });
  }
};

// READ (GET) ----------------------------------------------
/* export const getPaniers = async (req, res) => {
  try {
    const paniers = await Pannier.find();
    res.status(200).json(panniers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des paniers" });
  }
}; */

// UPDATE (PATCH) ------------------------------------------
/* export const updatePannier = async (req, res) => {
  try {
    const { id } = req.body;
    const updates = req.body;

    const result = await Pannier.updateOne({ _id: id }, updates);
    res.status(200).json({ message: "Le pannier a été modifié" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification du pannier" });
  }
}; */

// DELETE --------------------------------------------------
/* export const deletePannier = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Pannier.deleteOne({ _id: id });

    res.status(200).json({ message: "Le pannier a été supprimé" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du pannier" });
  }
}; */

// Ajout produit au panier ---------------------------------------

import panierAjout from "./panierModels.js";

export const ajoutProduitPanier = async (req, res) => {
  try {
    const { panierId, produitId } = req.body;

    if (!panierId || !produitId) {
      return res
        .status(400)
        .json({ message: "panierId et produitId sont requis" });
    }

    // Trouver le panier par son id
    const panier = await ajoutProduitPanier.findById(panierId);
    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    // Ajouter le produit à la liste (p_ids_produits)
    panier.p_ids_produits.push(produitId);

    // Sauvegarder le panier mis à jour
    await panier.save();

    res.status(200).json({ message: "Produit ajouté au panier", panierAjout });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//Fin ------------------------------------------------------------
