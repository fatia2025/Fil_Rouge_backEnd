import dotenv from "dotenv";

import connectDB from "./config.js";
import express from "express";

import utilisateursRouter from "./Utilisateurs/utilisateursRouter.js";
import profileRouter from "./Profile/profileRouter.js";
import produitsRouter from "./Produits/produitsRouter.js"; // route
import panierRouter from "./Panier/panierRouter.js";

console.log(" test filRouge_F ----------- ");
dotenv.config();
const app = express();

// connexion à la base de données
connectDB();

app.use(express.json());

// middleware et routes ici ...
app.use("/api/utilisateur", utilisateursRouter);
app.use("/api/profile", profileRouter);
app.use("/api/produit", produitsRouter);
app.use("/api/panier", panierRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`serveur en ligne sur http://localhost:3003`);
});
