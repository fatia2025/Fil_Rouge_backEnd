import Profile from "./profileModels.js";

export const getProfileUtilisateurParId = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate(
      "utilisateur"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error("error while fetching profiles", err);
    res.status(500).json({ error: "error" });
  }
};
