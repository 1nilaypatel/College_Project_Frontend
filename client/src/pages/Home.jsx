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
      "1922": 36.5,
      "1923": 37.2,
      "1924": 37.8,
      "1925": 38.1,
      "1926": 38.5,
      "1927": 37.9,
      "1928": 37.4,
      "1929": 36.8,
      "1930": 37.3,
      "1931": 37.1,
      "1932": 37.6,
      "1933": 38.0,
      "1934": 37.5,
      "1935": 37.9,
      "1936": 38.3,
      "1937": 37.7,
      "1938": 37.2,
      "1939": 36.9,
      "1940": 37.4,
      "1941": 38.2,
      "1942": 38.7,
      "1943": 38.0,
      "1944": 37.5,
      "1945": 37.1,
      "1946": 37.8,
      "1947": 38.4,
      "1948": 38.9,
      "1949": 38.3,
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
      "1960": 37.7,
      "1961": 37.2,
      "1962": 37.6,
      "1963": 38.0,
      "1964": 37.4,
      "1965": 37.9,
      "1966": 38.2,
      "1967": 37.7,
      "1968": 37.3,
      "1969": 38.1,
      "1970": 37.5,
      "1971": 37.8,
      "1972": 38.4,
      "1973": 38.9,
      "1974": 38.2,
      "1975": 37.6,
      "1976": 37.1,
      "1977": 37.5,
      "1978": 37.9,
      "1979": 38.3,
      "1980": 37.7,
      "1981": 37.2,
      "1982": 37.6,
      "1983": 38.0,
      "1984": 37.4,
      "1985": 37.8,
      "1986": 38.2,
      "1987": 37.7,
      "1988": 37.3,
      "1989": 38.1,
      "1990": 37.5,
      "1991": 37.8,
      "1992": 38.4,
      "1993": 38.9,
      "1994": 38.2,
      "1995": 37.6,
      "1996": 37.1,
      "1997": 37.5,
      "1998": 37.9,
      "1999": 38.3,
      "2000": 37.7,
      "2001": 37.2,
      "2002": 37.6,
      "2003": 38.0,
      "2004": 37.4,
      "2005": 37.8,
      "2006": 38.2,
      "2007": 37.7,
      "2008": 37.3,
      "2009": 38.1,
      "2010": 37.5,
      "2011": 37.8,
      "2012": 38.4,
      "2013": 38.9,
      "2014": 38.2,
      "2015": 37.6,
      "2016": 37.1,
      "2017": 37.5,
      "2018": 37.9,
      "2019": 38.3,
      "2020": 37.7
    }
    );
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
        <button className='px-6 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 focus:outline-none focus:bg-green-600'>Submit</button>
      </div>

      <div>
        <canvas id='temperatureChart' height={110}></canvas> 
      </div>
    </div>
  )
}