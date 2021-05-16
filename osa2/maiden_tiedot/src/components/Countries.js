import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => 
          <Language key={language.name} language={language} />
        )}
      </ul>
      <img width="150" height="100" alt="Flag of the country" src={country.flag} />
      <Weather capital={country.capital} />
    </div>
  )
}

const Language = ({ language }) => {
  return (
    <li>{language.name}</li>
  )
}

const Country = ({ country, showCountry }) => {
  return (
    <div>
      {country.name}
      <button onClick={() => showCountry(country)}>
      show
      </button>
    </div>
  )
}

const Countries = ({ countries, chosen, setChosen }) => {

  const showCountry = (country) => {
    setChosen(country)
  }

  if (chosen) {
    return (
      <CountryInfo country={chosen} />
    )
  }

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length === 1) {
    const country = countries[0]
    return (
      <CountryInfo country={country} />
    )
  }
  return (
    countries.map(country => 
      <Country key={country.name} country={country} showCountry={showCountry} />
    )
  )
}

export default Countries