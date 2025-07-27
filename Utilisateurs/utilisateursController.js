import Utilisateur from "./utilisateursModels.js";

import userSchema from "../validation.js";

import Profile from "../Profile/profileModels.js";
import Panier from "../Panier/panierModels.js";

import argon2 from "argon2";
import jwt from "jsonwebtoken";

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

    // Ici commance l'ajoute de l'authentification :
    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    const hash = await argon2.hash(motDePasse);

    const nouvelUtilisateur = new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse: hash,
      adresse,
    });

    await nouvelUtilisateur.save();
    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Connexion login
export const login = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const motDePasseValide = await argon2.verify(
      utilisateur.motDePasse,
      motDePasse
    );
    if (!motDePasseValide) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: utilisateur._id },
      process.env.JWT_SECRET || "secretTrèsSecret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
//-----------------------------------------------

const profile = new Profile({
  prenom,
  nom,
  adresse,
  email,
  utilisateur: utilisateur._id,
});
await profile.save();
utilisateur.profile = profile._id;

// Créer un panier pour un nouveau utilisateur
const panier = new Panier({
  p_id_utilisateur: utilisateur._id,
  p_ids_produits: [],
  p_totale: 0, // ou autre valeur par défaut
  p_datte: new Date(),
});

// Associer le  référence panier
utilisateur.panier = panier._id;
await utilisateur.save();
await panier.save();
// -------------------------
try {
  // ajout après code authen !
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

// Validation ------------------------------------

console.log("test hors joi");
const createUser = (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  console.log("test joi");
  console.log(req.body);

  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.details[0].message });
  }
  // Si tout est valide, on crée un objet utilisateur :
  // id = un identifiant unique basé sur l'heure actuelle
  //...value = toutes les données validées (name, email, password...)

  const user = {
    id: Date.now(),
    ...value,
  };

  res.status(201).json({
    message: " Utilisateur créé avec succès",
    user,
  });
};
export default createUser;

// ---------------------------------------------------------
