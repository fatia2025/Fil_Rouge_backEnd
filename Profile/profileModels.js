import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
