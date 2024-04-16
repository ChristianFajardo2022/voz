import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Formulario() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        tipodocumento: '',
        numerodocumento: '',
        email: '',
        telefono: '',
        nombredestino: '',
        apellidodestino: '',
        pais: '',
        departamento: '',
        ciudad: '',
        direccion: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();
    const mediaBlobUrl = location.state?.mediaBlobUrl;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mediaBlobUrl) {
            setError("Por favor, graba un audio antes de enviar el formulario.");
            alert("Por favor, graba un audio antes de enviar el formulario.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
            const data = new FormData();
            data.append('formData', JSON.stringify(formData));
            data.append('audio', audioBlob, 'audio.mp3');

            const response = await axios.post('https://audiosmadres.onrender.com/submit-form', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Datos y audio enviados con éxito', response.data);
            alert("¡Formulario enviado con éxito!");
            setIsLoading(false);
        } catch (error) {
            console.error('Error al enviar los datos y audio', error);
            setError("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full h-screen flex flex-col justify-center items-center bg-slate-400'>
            <div className='w-[30%] bg-blue-200 p-4 rounded-lg'>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                {isLoading && <p>Loading...</p>}
                <div className='my-4'>
                    <label className='mr-4'>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Tipo de Documento:</label>
                    <input type="text" name="tipodocumento" value={formData.tipodocumento} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Número de Documento:</label>
                    <input type="text" name="numerodocumento" value={formData.numerodocumento} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Correo Electrónico:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Teléfono:</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Nombre Destino:</label>
                    <input type="text" name="nombredestino" value={formData.nombredestino} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Apellido Destino:</label>
                    <input type="text" name="apellidodestino" value={formData.apellidodestino} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>País:</label>
                    <input type="text" name="pais" value={formData.pais} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Departamento:</label>
                    <input type="text" name="departamento" value={formData.departamento} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Ciudad:</label>
                    <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="p-2" />
                </div>
                <div className='my-4'>
                    <label className='mr-4'>Dirección:</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="p-2" />
                </div>
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg mt-4">Enviar</button>
            </div>
        </form>
    );
}

export default Formulario;