const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Trait Schema
const TraitSchema = new Schema({
    island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["physical", "psychological", "social", "other"],
      default: "other",
    },
  });
  
  const Trait = model("Trait", TraitSchema);

  
// Character Trait Schema
const CharacterTraitSchema = new Schema({
    island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
    character_id: { type: Schema.Types.ObjectId, ref: "Character", required: true },
    trait_id: { type: Schema.Types.ObjectId, ref: "Trait", required: true },
    value: { type: Number, min: 0, max: 100, required: true },
  });
  
  const CharacterTrait = model("CharacterTrait", CharacterTraitSchema);
 ``  
  