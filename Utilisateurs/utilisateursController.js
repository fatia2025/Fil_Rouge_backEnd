import Utilisateur from "./utilisateurModels.js";

import Profile from "../Profile/profileModels.js";

import Panier from "../Panier/panierModels.js";

// POST ----------------------------------
export const creationUtilisateurEtProfile = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, adresse } = req.body;
    const utilisateur = await new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse,
      adresse,
    }).save();
    await utilisateur.save();

    const profile = new Profile({
      nom,
      prenom,
      adresse,
      email,
      utilisateur: utilisateur._id,
    });

    // Créer un panier vide pour ce nouvel utilisateur
    const panier = new Panier({
      p_id_utilisateur: utilisateur._id,
      p_totale: 0, // ou autre valeur par défaut
      p_datte: new Date(),
    });

    await profile.save();

    utilisateur.profile = profile._id;
    // Associer le  référence panier
    utilisateur.panier = panier._id;

    await utilisateur.save();
    await panier.save();
    // -------------------------
    const populatedUtilisateur = await Utilisateur.findById(utilisateur._id)
      .populate("profile") // populate à voir
      .populate("panier");

    res.status(201).json({
      utilisateurId: utilisateur._id,
      profileId: profile._id,
      Utilisateur: populatedUtilisateur,
      utilisateur: populatedUtilisateur, // Récupération avec .populate
    });
  } catch (err) {
    console.error(" erreur création du profil ", err);
    res.status(500).json({ message: "error" });
  }
};
// GET ----------------------------------
export const utilisateurParId = async (req, res) => {
  try {
    const utilisateurTrouve = await Utilisateur.findById(
      req.params.id
    ).populate("profile");
    if (!utilisateurTrouve) {
      console.error("user not found");
      return res.status(404).json("Invalid ID, cannot find the user");
    }
    return res.status(200).json(utilisateurTrouve);
  } catch (err) {
    console.error("error while trying to fetch users", err);
    return res.status(500).json({ message: "error" });
  }
};
// PATCH ----------------------------------
export const updateUtilisateurParId = async (req, res) => {
  try {
    const { nom, email, prenom, motDePasse, adresse } = req.body;
    if (!nom || !email || !motDePasse || !prenom || !adresse) {
      return res.status(400).json("Missing required fields");
    }
    const updatedUtilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      { nom, email, motDePasse, prenom, adresse },
      { new: true }
    );
    if (!updatedUtilisateur) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json("User updated with success");
  } catch (err) {
    console.error("cannot update user", err);
    return res.status(500).json("error");
  }
};
// DELETE ----------------------------------
export const supressionUtilisateurParId = async (req, res) => {
  try {
    const utilisateurSupprime = await Utilisateur.findByIdAndDelete(
      req.params.id
    );
    if (!utilisateurSupprime) {
      return res.status(404).json("User not found");
    }

    await Profile.findOneAndDelete({ utilisateur: req.params.id });

    return res.status(200).json("User and profile deleted successfully");
  } catch (err) {
    console.error("Error while trying to delete user", err);
    return res.status(500).json({ message: "error" });
  }
};
// ----------------------------------
