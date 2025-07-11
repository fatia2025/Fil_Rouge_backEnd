import express from "express";
const app = express();
import router from "./routes.js";

app.use("/", router);

// lancer serveur
/* app.listen(3000, () => {
  console.log(`serveur sur http://localhost:3000`); // ``
}); */
