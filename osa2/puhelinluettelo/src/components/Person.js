import React from 'react'

const Persons = ({ persons, deletePerson }) => {
  return (
    persons.map(person => 
      <Person key={person.name} person={person} deletePerson={deletePerson} />
    )
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => {
        if (window.confirm(`Delete ${person.name} ?`)) {
          deletePerson(person.id)}}} >
        delete
      </button>
    </div>
  )
}

export default Persons