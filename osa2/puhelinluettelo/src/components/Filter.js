import React from 'react'

const Filter = ({ handleSearch }) => {
  return (
    <div>filter shown with <input onChange={ (event) => handleSearch(event)} /></div>
  )
}

export default Filter