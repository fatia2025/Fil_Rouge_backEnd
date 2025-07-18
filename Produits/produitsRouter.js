import express from "express";

// import produits
import {
  createProduit,
  getProduit,
  patchProduit,
  deleteProduit,
} from "./produitsController.js";

const router = express.Router();

router.post("/", createProduit);
router.get("/test", getProduit);
router.patch("/", patchProduit);
router.delete("/:id", deleteProduit);

export default router;
