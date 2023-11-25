// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conectarDB from "@/lib/dbConnect";

export default async function handler(req, res) {
  await conectarDB();

  // POST api/anime
  const {method} = req;

  switch(method) {
    case 'POST':
      try {
        const Anime = new Anime (req.body);
        await Anime.save();

        return res.json(200).json({success: true, Anime});
      } catch (error) {
        return res.status(400).json({success: false, error});
      }
    default:
      return res
        .status(500)
        .json({success: false, error: 'Falla del servidor :('});
  }
}
