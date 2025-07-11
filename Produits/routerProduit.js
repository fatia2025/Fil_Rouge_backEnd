import express from "express";
import { getProduits, createProduit } from "./controller.js";

const router = express.Router();

router.get("/", getProduits);
router.post("/", createProduit);

export default router;
