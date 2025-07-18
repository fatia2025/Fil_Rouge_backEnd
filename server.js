// Dans ce fichier je test juste app.js
import express from "express";
const server = express();
const port = 3000;

console.log("hiiiiiiiiiiiiiiiiiiiiiiiii");

server.listen(process.env.PORT || 3000, () => {
  console.log(" Serveur démarré sur http://localhost:3000");
});
