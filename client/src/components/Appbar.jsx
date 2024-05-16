import { useState } from 'react';

export default function Appbar() {
  const [temperature, setTemperature] = useState(true);
  const [precipitation, setPrecipitation] = useState(true);

  const handleToggleTemperature = () => {
    setTemperature(prevState => !prevState);
  };

  const handleTogglePrecipitation = () => {
    setPrecipitation(prevState => !prevState);
  };

  return (
    <div className='border p-8 flex justify-between items-center'>
      <div>
        <img src="" alt="Logo" />
      </div>
      <div className='flex gap-10'>
        <div className='flex flex-col items-center'>
          <input
            type="range"
            min="0"
            max="1"
            step="1"
            value={temperature ? "1" : "0"}
            onChange={handleToggleTemperature}
            className="w-6"
          />
          <button onClick={handleToggleTemperature}>
            {temperature ? 'Temperature Off' : 'Temperature On'}
          </button>
        </div>
        <div className='flex flex-col items-center'>
          <input
            type="range"
            min="0"
            max="1"
            step="1"
            value={precipitation ? "1" : "0"}
            onChange={handleTogglePrecipitation}
            className="w-6"
          />
          <button onClick={handleTogglePrecipitation}>
            {precipitation ? 'Precipitation Off' : 'Precipitation On'}
          </button>
        </div>
      </div>
    </div>
  )
}
