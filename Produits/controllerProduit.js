import Produit from "./modelProduit.js";

// GET tous les produits
export const getProduits = async (req, res) => {
  const produits = await Produit.find();
  res.json(produits);
};

// POST nouveau produit
export const createProduit = async (req, res) => {
  const { nom, categories, prix } = req.body;
  const produit = new Produit({ nom, categories, prix });
  await produit.save();
  res.status(201).json(produit);
};
