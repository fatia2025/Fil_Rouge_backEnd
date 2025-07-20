import Profile from "./profileModels.js";

export const getProfileUtilisateurParId = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate(
      //  ? ici explication ?
      "utilisateur"
    );
    if (!profile) {
      return res.status(404).json({ message: "pas de profile" });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error("erreure d'affichage", err);
    res.status(500).json({ error: "erreur" });
  }
};
