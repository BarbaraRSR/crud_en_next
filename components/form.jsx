import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useState } from 'react';

const Form = ({formData, forNewAnime = true}) => {

    const router = useRouter();

    const [form, setForm] = useState({
        title: formData.title,
        plot: formData.plot,
    });
    const [message, setMessage] = useState([]);

    const handleChange = e => {
        const {value, name} = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(forNewAnime){
          postData(form);
        } else {
          // editar data
          putData(form)
        }
    };

    const putData = async (form) => {
            const {id} = router.query
        try {
            const res = await fetch(`/api/anime/${id}`, {
                method: 'PUT',
                headers: { "Content-type": "application/json", },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);

            if(!data.success){
                for (const key in data.error) {
                    let error = data.error[key]
                    setMessage(oldMsg => [
                        ...oldMsg,
                        {message: error.message}
                    ]);
                }
            } else {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async (form) => {
        try {
            console.log(form);
            const res = await fetch('/api/anime', {
                method: 'POST',
                headers: { "Content-type": "application/json", },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);
            if(!data.success){
                for (const key in data.error) {
                    let error = data.error[key]
                    setMessage(oldMsg => [
                        ...oldMsg,
                        {message: error.message}
                    ]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
                <form onSubmit={handleSubmit}>
                    <input className='form-control my-2' type="text" placeholder='Title' autoComplete='off' name="title" value={form.title} onChange={handleChange} />
                    <input className='form-control my-2' type="text" placeholder='Plot' autoComplete='off' name="plot" value={form.plot} onChange={handleChange} />
                    <button className="btn btn-primary" type="submit">
                        {forNewAnime ? "Agregar" : "Modificar"}
                    </button>
                    <Link href="/" className="btn btn-warning mx-2">Cancelar</Link>
                    {
                        message.map(({message}) => (
                            <p key={message}>{message}</p>
                        ))
                    }
                </form>
        </div>
    )
};

export default Form;