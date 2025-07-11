import express from "express";
import { getProfileUtilisateurParId } from "./profileController.js";

const router = express.Router();

router.get("/profile/:id", getProfileUtilisateurParId);

export default router;
