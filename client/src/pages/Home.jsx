import { useState, useEffect } from 'react';
import CountryStates from '../components/CountryStates.jsx';
import Chart from 'chart.js/auto';
import axios from 'axios';

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
  const [precipitationData, setPrecipitationData] = useState(null);
  let api;

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
    const selectedYear = parseInt(event.target.value);
    setSelectedEndYear(selectedYear);
  };

  const states = selectedCountry ? CountryStates[selectedCountry] : [];

  // useEffect(() => {
  //   // Fetch temperature data based on selected criteria
  //   // For demonstration, let's use the sample data directly
  //   setTemperatureData({
  //     "1922": 36.5,
  //     "1923": 37.2,
  //     "1924": 37.8,
  //     "1925": 38.1,
  //     "1926": 38.5,
  //     "1927": 37.9
  //   }
  //   );
  // }, []);

  const handleSubmit = async () => {
    try {
      if(temperature) api = 'http://127.0.0.1:8000/api/predict_temperature/';
      if(precipitation) api = 'http://127.0.0.1:8000/api/predict_precipitation/';
      // console.log(api);
      const response = await axios.post(api, {
        country: selectedCountry,
        state: selectedState,
        start_year: selectedStartYear,
        end_year: selectedEndYear,
      });
      if(temperature) setTemperatureData(response.data);
      if(precipitation) setPrecipitationData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (temperatureData) {
      renderTemperatureChart();
    }
    if (precipitationData) {
      renderPrecipitationChart();
    }
  }, [temperatureData, precipitationData]);

  const renderTemperatureChart = () => {
    const ctx = document.getElementById('temperatureChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(temperatureData),
        datasets: [{
          label: 'Temperature (°C)',
          data: Object.values(temperatureData),
          borderColor: '#167efb',
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

  const renderPrecipitationChart = () => {
    const ctx = document.getElementById('precipitationChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(precipitationData),
        datasets: [{
          label: 'Precipitation (in mm)',
          data: Object.values(precipitationData),
          borderColor: '#167efb',
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
    <div className='flex flex-col gap-4 px-14 py-5'>
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
        <button onClick={handleSubmit} className='px-6 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 focus:outline-none focus:bg-green-600'>Submit</button>
      </div>

      <div>
        <canvas id='temperatureChart' height={98}></canvas> 
        <canvas id='precipitationChart' height={98}></canvas> 
      </div>
    </div>
  )
}