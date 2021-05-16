import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState(countries);
  const [ chosenCountry, setChosenCountry ] = useState()

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase()
    let result = []
    result = countries.filter((country) => {
      return country.name.toLowerCase().search(value) !== -1
    })
    setFilteredCountries(result)
    setChosenCountry(null)
  }

  return (
    <div>
      <p>find countries <input onChange={(event) => handleSearch(event)} /></p>
      <Countries countries={filteredCountries} chosen={chosenCountry} setChosen={setChosenCountry} />
    </div>
  )
}

export default App