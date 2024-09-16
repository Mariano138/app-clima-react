import { useState } from "react";

export const WeatherApp = () => {
  const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
  const APIKEY = `13477663e3711c3e87ce05a5d7d72bb6`;
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataCiudad, setDataCiudad] = useState(null);

  const onInputChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchApi();
  };

  const fetchApi = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${APIKEY}`);
      const data = await response.json();
      setDataCiudad(data);
    } catch (error) {
      console.error("Hubo un error: " + error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={onInputChange} />
        <button type="submit">Buscar</button>
      </form>
      {dataCiudad && (
        <div>
          <h2>{dataCiudad.name}</h2>
          <p>Temperatura: {parseInt(dataCiudad.main.temp - difKelvin)}°C</p>
          <p>Humedad: {dataCiudad.main.humidity}%</p>
          <p>Condición Meteorologíca: {dataCiudad.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataCiudad.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};
