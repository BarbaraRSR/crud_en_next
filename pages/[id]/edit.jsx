import Form from "@/components/form";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

  const fetcher = (url) =>
    fetch(url)
      .then(res => res.json() )
      .then(json => json.data);

  const EditAnime = () => {
    const router = useRouter();
    const {id} = router.query;

    const {data: anime, error} = useSWR(id ? `/api/anime/${id}` : null, fetcher )
      if(!anime){
        return (
          <div className="container mt-5 text-center"><h1>Loading...</h1></div>
        );
      }

    const formData = {
      title: anime.title,
      plot: anime.plot
    };

  return (
    <main className="container">
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">Editar anime<span className="ai-list"></span></h1>
        <p className="lead text-body-secondary">Modificar los datos del registro.</p>

          <Form 
            forNewAnime={false}
            formData={formData}
          />

        <hr className="my-5" />
        </div>
      </div>
      <Link className="btn btn-primary" href="/">Volver</Link>
    </section>
    </main>
  );
};

export default EditAnime;