import Produit from "./produitModels.js";

// POST ----------------------------------------------------
export const createProduit = async (req, res) => {
  try {
    console.log("hello");
    console.log(req.body);
    const { nom, categorie, prix } = req.body;

    /* const category = new Category({ genre }); comme ca ajouter une seule catégorie
    await category.save(); */
    console.log(nom, categorie, prix);

    const produit = await Produit.create(req.body); //avant c'etait await Produit.create({ nom, categorie, prix }); avant d'ajouter plusieurs objets dans []. // Sinon autre manière, plusieurs produits à la fois : const produits = await Produit.insertMany(data);
    res.status(201).json(produit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur de la création de la catégorie" });
  }
};
// GET ----------------------------------------------------
export const getProduit = async (req, res) => {
  console.log("Bonjour");
  const produit = await Produit.find(); // cette ligne pour recupérer les produits //  cétait que les 3 première ligne.
  console.log(produit);
  res.send(produit);
};
// PATCH ----------------------------------------------------
export const patchProduit = async (req, res) => {
  try {
    console.log("helloo");
    console.log("body", req.body._id);

    // const { id } = req.params; // réqcupérer l'id dans l'URL
    const id = req.body._id;
    const ProduitAmodif = req.body; // ce que tu veux modifier
    console.log(req.body);
    const produit = await Produit.updateOne({ _id: id }, ProduitAmodif);
    res.status(200).json({ message: "le produit est modifié" });
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification du produit" });
  }
  // test remplacer  (req, res) par (req.body) pour modifier plusieurs élément du tableau
  // const produit = await produit.updateOne(req.body);
  // res.send("le produit est modifié");
};

// DELETE ----------------------------------------------------
export const deleteProduit = async (req, res) => {
  try {
    console.log("params", req.params.id); // _id:id
    //const { id } = req.params; // réqcupérer l'id dans l'URL // autre methode const id = req.params.id
    const id = req.params.id;
    const produit = await Produit.deleteOne({ _id: id });
    res.status(200).json({ message: "le produit est supprimé" });
  } catch (erreur) {
    console.error(erreur);
    res
      .status(500)
      .json({ message: "Erreur lors de la supprission du produit" });
  }
  // test remplacer  (req, res) par (req.body) pour modifier plusieurs élément du tableau
  // const produit = await produit.updateOne(req.body);
  // res.send("le produit est modifié");
};
