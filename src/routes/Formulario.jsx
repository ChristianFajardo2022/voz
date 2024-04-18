import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Formulario() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    tipo_identificacion_usuario: "308",
    numero_identificacion_usuario: "",
    username: "",
    telephone: "",
    nombredestino: "",
    apellidodestino: "",
    pais: "",
    region_id: "1987",
    city: "",
    street: "",
    promoId: "MMbear",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const mediaBlobUrl = location.state?.mediaBlobUrl;

  console.log(mediaBlobUrl);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construir la URL del proxy CORS Anywhere y la URL del servidor final
    const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
    const serverUrl = "http://newintegration.local/operacionmayo/comprar";

    // Realizar la solicitud
    try {
      const response = await fetch(corsAnywhereUrl + serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      // Redirigir al usuario a la URL deseada
      const queryString = Object.keys(formData)
        .map((key) => key + "=" + formData[key])
        .join("&");
      window.location.href = `http://newintegration.local/operacionmayo/comprar?${queryString}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex flex-col justify-center items-center bg-slate-400"
    >
      <div className="w-[30%] bg-blue-200 p-4 rounded-lg">
        {error && (
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {isLoading && <p>Loading...</p>}
        <div className="my-4">
          <label className="mr-4">Agrega tu Nombre:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Apellido:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Tipo de Documento:</label>
          <input
            type="text"
            name="tipo_identificacion_usuario"
            value={formData.tipo_identificacion_usuario}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Número de Documento:</label>
          <input
            type="text"
            name="numero_identificacion_usuario"
            value={formData.numero_identificacion_usuario}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Correo Electrónico:</label>
          <input
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Teléfono:</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Nombre Destino:</label>
          <input
            type="text"
            name="nombredestino"
            value={formData.nombredestino}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Apellido Destino:</label>
          <input
            type="text"
            name="apellidodestino"
            value={formData.apellidodestino}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">País:</label>
          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Departamento:</label>
          <input
            type="text"
            name="region_id"
            value={formData.region_id}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Ciudad:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="p-2"
          />
        </div>
        <div className="my-4">
          <label className="mr-4">Dirección:</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="p-2"
          />
          <label className="mr-4 hidden">promoId:</label>

          <input
            type="text"
            name="promoid"
            value={formData.promoId}
            onChange={handleChange}
            className="p-2 hidden"
          />

          {/* Crear input de id de la app name="promoid" value="MMbear" */}
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-lg mt-4"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

export default Formulario;
