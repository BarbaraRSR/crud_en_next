import Form from '../components/form'

const New = () => {

    const formData = {
        title: '',
        plot: '',
    }

    return (
        <main className="container">
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Agregar anime<span className="ai-list"></span></h1>
            <p className="lead text-body-secondary">Llena los campos para agregar un anime a la lista.</p>
        
                <div className="container">
                    <Form formData={formData} />
                </div>

            </div>
          </div>
        </section>
        </main>
    );
};


export default New;