import express from "express";
import { createPanier } from "./panierController.js";

//getPaniers,
//updatePanier,
//deletePanier,

const router = express.Router();

router.post("/", createPanier);

//router.get("/", getPaniers);
//router.patch("/", updatePanier);
//router.delete("/:id", deletePanier);

export default router;
