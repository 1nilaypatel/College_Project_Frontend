import { useState, useEffect } from 'react';
import CountryStates from '../components/CountryStates.jsx';
import Chart from 'chart.js/auto';

const countries = Object.keys(CountryStates);

const startYears = Array.from({ length: 75 }, (_, index) => new Date().getFullYear() - index);

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedStartYear, setSelectedStartYear] = useState('');
  const [selectedEndYear, setSelectedEndYear] = useState('');
  const [temperature, setTemperature] = useState(false);
  const [precipitation, setPrecipitation] = useState(false);
  const [temperatureData, setTemperatureData] = useState(null);

  const handleToggleTemperature = () => {
    setTemperature(true);
    setPrecipitation(false);
  };

  const handleTogglePrecipitation = () => {
    setTemperature(false);
    setPrecipitation(true);
  };

  const handleSelectCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSelectState = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSelectStartYear = (event) => {
    const selectedYear = parseInt(event.target.value);
    setSelectedStartYear(selectedYear);
    setSelectedEndYear('');
  };

  const handleSelectEndYear = (event) => {
    setSelectedEndYear(event.target.value);
  };

  const states = selectedCountry ? CountryStates[selectedCountry] : [];

  useEffect(() => {
    // Fetch temperature data based on selected criteria
    // For demonstration, let's use the sample data directly
    setTemperatureData({
      "1950": 37.8,
      "1951": 37.34,
      "1952": 38.1,
      "1953": 36.9,
      "1954": 37.6,
      "1955": 37.2,
      "1956": 38.0,
      "1957": 37.5,
      "1958": 37.9,
      "1959": 38.3,
      "1960": 37.7
    });
  }, []);

  useEffect(() => {
    // Render the chart when temperatureData changes
    if (temperatureData) {
      renderChart();
    }
  }, [temperatureData]);

  const renderChart = () => {
    const ctx = document.getElementById('temperatureChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(temperatureData),
        datasets: [{
          label: 'Temperature (°C)',
          data: Object.values(temperatureData),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  };

  return (
    <div className='flex flex-col gap-6 px-14 py-5'>
      <div className="flex flex-row items-center space-x-5">
        <button
          onClick={handleToggleTemperature}
          className={`px-6 py-2 text-white rounded transition-transform transform ${
            temperature ? 'bg-green-500 hover:scale-105 cursor-pointer shadow-2xl' : 'bg-red-500'
          }`}
        >
          Temperature
        </button>

        <button
          onClick={handleTogglePrecipitation}
          className={`px-6 py-2 text-white rounded transition-transform transform ${
            precipitation ? 'bg-green-500 hover:scale-105 cursor-pointer shadow-2xl' : 'bg-red-500'
          }`}
        >
          Precipitation
        </button>
      </div>

      <div className='flex justify-between'>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleSelectCountry}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-[#167efb] text-gray-100 shadow-2xl"
        >
          <option value="">Select a Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          id="state"
          value={selectedState}
          onChange={handleSelectState}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-[#167efb] text-gray-100 shadow-2xl"
        >
          <option value="">Select a State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        <select
          id="startYear"
          value={selectedStartYear}
          onChange={handleSelectStartYear}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-[#167efb] text-gray-100 shadow-2xl"
        >
          <option value="">Select Start Year</option>
          {startYears.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>

        <select
          id="endYear"
          value={selectedEndYear}
          onChange={handleSelectEndYear}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-[#167efb] text-gray-100 shadow-2xl"
        >
          <option value="">Select End Year</option>
          {(selectedStartYear ? Array.from({ length: 2051 - selectedStartYear }, (_, index) => selectedStartYear + index) : []).map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className='flex justify-end'>
        <button className='px-6 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 focus:outline-none focus:bg-green-600'>Submit</button>
      </div>

      <div>
        <canvas id='temperatureChart' width={400} height={200}></canvas>
      </div>
    </div>
  )
}