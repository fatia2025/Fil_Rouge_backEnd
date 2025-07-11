import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routerProduit from "./Produits/routerProduit.js";

dotenv.config();
const app = express();

app.use(express.json());

import connectDB from "./config.js";

app.use("/api/produits", routerProduit);

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(" Serveur démarré sur http://localhost:3000");
});
