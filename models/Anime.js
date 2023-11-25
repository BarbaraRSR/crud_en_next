import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Ingresa un título para el anime."],
  },
  plot: { 
    type: String,
    required: [true, "Describe el plot del anime."],
  },
});

export default mongoose.models.Anime || mongoose.model("Anime", AnimeSchema);
