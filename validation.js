import Joi from "joi";

const userSchema = Joi.object({
  nom: Joi.string().min(3).required().messages({
    "string.empty": "Le nom est requis",
    "string.min": "Le nom doit contenir au moins 3 caractères",
  }),

  prenom: Joi.string().min(3).required().messages({
    "string.empty": "Le nom est requis",
    "string.min": "Le nom doit contenir au moins 3 caractères",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email est invalide",
    "any.required": "L'email est requis",
  }),

  motDePasse: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "any.required": "Le mot de passe est requis",
  }),

  adresse: Joi.string().min(13).required(),

  Profile: Joi.string().min(3).required(),
});

export default userSchema;
