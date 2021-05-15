import React, { useState, useEffect } from 'react'
import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      const person = persons.find(person => person.name === newName)
      const id = person.id
      const changedPerson = { ...person, number: newNumber }

      if (person.number === newNumber) {
        window.alert(`${newName} is already added to phonebook with the same number`)
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          updatePerson(id, changedPerson)
        }}
    } else {
      
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .then( () => {
          setSuccessMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Could not add ${newName}` 
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const updatePerson = (id, changedPerson) => {
    const person = persons.find(person => person.id === id)

    personService
    .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setFilteredPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .then(() => {
        setSuccessMessage(
          `Changed ${person.name}'s number to ${changedPerson.number}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server` 
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    personService
    .destroy(id)
      .then( () => {
        setPersons(persons.filter(person => person.id !== id))
        setFilteredPersons(persons.filter(person => person.id !== id))
      })
      .then( () => {
        setSuccessMessage(
          `Deleted ${person.name}` 
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server` 
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase()
    let result = []
    result = persons.filter((person) => {
      return person.name.toLowerCase().search(value) !== -1
    })
    setFilteredPersons(result)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success"/>
      <Notification message={errorMessage} type="error"/>
      <Filter handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
        text="add"
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
