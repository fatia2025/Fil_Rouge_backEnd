import dotenv from "dotenv";
import connectDB from "./config.js";
import express from "express";
import utilisateursRouter from "./Utilisateurs/utilisateursRouter.js";
import profileRouter from "./Profile/profileRouter.js";
import produitsRouter from "./Produits/produitsRouter.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/utilisateur", utilisateursRouter);
app.use("/api/profile", profileRouter);
app.use("/api/produit", produitsRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(" Serveur démarré sur http://localhost:3000");
});
