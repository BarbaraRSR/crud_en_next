// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conectarDB from "@/lib/dbConnect";
import Anime from "@/models/Anime";

export default async function handler(req, res) {
  await conectarDB();

  // GET api/anime/:id (obtener ID y listarlo)
  const {method, query: {id}} = req;

  switch(method) {
    case 'PUT':
      try {
        const anime = await Anime.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );
        if (!anime) {
            return res.status(404).json({success: false, error: "1"});
        }
            return res.json({success: true, data: anime});
      } catch (error) {
            console.error(error);
            return res.status(404).json({success: false, error: "2"});
      }

    case 'DELETE':
      try {
        const anime = await Anime.findByIdAndDelete(id);
        if (!anime) {
            return res.status(404).json({success: false, error: "1"});
        }
            return res.json({success: true, data: anime});
      } catch (error) {
            console.error(error);
            return res.status(404).json({success: false, error: "2"});
      }

    case 'GET':
      try {
        const anime = await Anime.findById(id).lean();
        if (!anime) {
            return res.status(404).json({success: false, error: "1"});
        }
            return res.json({success: true, data: anime});
      } catch (error) {
            console.error(error);
            return res.status(404).json({success: false, error: "2"});
      }
    default:
      return res.status(500).json({success: false, error: 'Falla del servidor :('});
  }
}
