import express from "express";

const router = express.Router();

import {
  updateUtilisateurParId,
  supressionUtilisateurParId,
  creationUtilisateurEtProfile,
  utilisateurParId,
} from "./utilisateursController.js";

router.get("/:id", utilisateurParId);
router.post("/", creationUtilisateurEtProfile);
router.put("/:id", updateUtilisateurParId);
router.delete("/:id", supressionUtilisateurParId);

export default router;
