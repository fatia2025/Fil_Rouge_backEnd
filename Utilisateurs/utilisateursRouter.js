import express from "express";

const router = express.Router();

import {
  updateUtilisateurParId,
  supressionUtilisateurParId,
  creationUtilisateurEtProfile,
  utilisateurParId,
  login,
} from "./utilisateursController.js";

router.post("/utilisateur", creationUtilisateurEtProfile);
router.get("/:id", utilisateurParId);
router.put("/:id", updateUtilisateurParId);
router.delete("/:id", supressionUtilisateurParId);

// Authentification -------------------------------------------:
//router.post("/register", creationUtilisateurEtProfile); // déjà existant
router.post("/login", login); // <--- ajoute ceci
router.get("/:id", verifierToken, utilisateurParId); // protégé par token
// router.patch("/:id", verifierToken, updateUtilisateurParId); // à developper
// router.delete("/:id", verifierToken, supressionUtilisateurParId); // à developper

export default router;
