import { useState } from "react";
import weather from "../assets/weather.png"

export default function Appbar() {
  const [selected, setSelected] = useState(null);
  const [temperature, setTemperature] = useState(false);
  const [precipitation, setPrecipitation] = useState(false);

  const handleToggleTemperature = () => {
     setTemperature(true);
     setPrecipitation(false);
  };

  const handleTogglePrecipitation = () => {
     setTemperature(false);
     setPrecipitation(true);
  };

  return (
    <div className="border p-3 flex justify-between items-center">
      <div>
        <img style={{height: "80px"}} src={weather} alt="" />
      </div>
      <div className="flex flex-row items-center space-x-5">
        <button
          onClick={handleToggleTemperature}
          className={`px-6 py-2 text-white font-bold rounded transition-transform transform ${
            temperature ? 'bg-green-500 hover:scale-105 cursor-pointer' : 'bg-red-500'
          }`}
        >
          Temperature
        </button>

        <button
          onClick={handleTogglePrecipitation}
          className={`px-6 py-2 text-white font-bold rounded transition-transform transform ${
            precipitation ? 'bg-green-500 hover:scale-105 cursor-pointer' : 'bg-red-500'
          }`}
        >
          Precipitation
        </button>
      </div>
    </div>
  );
}
