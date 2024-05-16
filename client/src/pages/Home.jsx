import { useState } from 'react';

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  // Add more country names as needed
];

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  // Add more state names as needed
];
const startYears = Array.from({ length: 50 }, (_, index) => new Date().getFullYear() - index); // Generate an array of start years from current year to 50 years ago

const endYears = Array.from({ length: 50 }, (_, index) => new Date().getFullYear() + index); // Generate an array of end years from current year to 50 years in the future

export default function Home() {

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedStartYear, setSelectedStartYear] = useState('');
  const [selectedEndYear, setSelectedEndYear] = useState('');

  const handleSelectCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSelectState = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSelectStartYear = (event) => {
    setSelectedStartYear(event.target.value);
  };

  const handleSelectEndYear = (event) => {
    setSelectedEndYear(event.target.value);
  };

  return (
    <div className='flex flex-col gap-10 p-10'>
      <div>
        number 10
      </div>

      <div className='flex justify-between'>

        <select id="country" value={selectedCountry} onChange={handleSelectCountry}>
          <option value="">Select a Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select id="state" value={selectedState} onChange={handleSelectState}>
          <option value="">Select a State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        <select id="startYear" value={selectedStartYear} onChange={handleSelectStartYear} >
          <option value="">Select Start Year</option>
          {startYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select id="endYear" value={selectedEndYear} onChange={handleSelectEndYear}>
          <option value="">Select End Year</option>
          {endYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

      </div>

      <div className='flex justify-end'>
        <button className='px-5 py-2 bg-green-500 rounded-md'>
          Submit
        </button>
      </div>

      <div>
        graphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphgraphg
      </div>
    </div>
  )
}
