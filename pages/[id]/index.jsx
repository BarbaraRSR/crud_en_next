import conectarDB from "@/lib/dbConnect";
import Anime from "@/models/Anime";
import Link from "next/link";
import { useRouter } from "next/router";

const AnimePage = ({success, error, anime}) => {

    const router = useRouter();

    if (!success) {
        return (
            <div className="container text-center my-5">
                <h1>{error} 🤔</h1>
                <Link className="btn btn-primary" href="/">Volver</Link>
            </div>
        );
    }

    const deleteData = async() => {
        try {
            await fetch (`/api/anime/${id}`, {
                method: 'DELETE',
            })
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="container">
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Detalles del Anime<span className="ai-list"></span></h1>
            <hr />
                <div className='h5 text-uppercase'>{anime.title}</div>
                <p className='fw-light'>{anime.plot}</p>
                <br />
                <Link className="btn btn-warning" href={`/${anime._id}/edit`}>Modificar</Link>
                <Link className="btn btn-danger mx-2" href="/">Eliminar</Link>
                <hr className="my-5" />
            </div>
          </div>
          <Link className="btn btn-primary" href="/">Volver</Link>
        </section>
        </main>
    );
}

export default AnimePage;

// Conexión a la base de datos.
export async function getServerSideProps({params}) {
    try {
        await conectarDB();
        const anime = await Anime.findById(params.id).lean();

        if (!anime) {
            return { props: { success: false, error: "Anime no encontrado." } };
        }
      
        console.log(anime);
        anime._id = `${anime._id}`
        return {props: { success: true, anime} };

    }   catch (error) {
        console.log (error);
        return { props: { success: false, error: error} };
    }
  }
  