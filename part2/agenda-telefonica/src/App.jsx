import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import agendaServices from './services/agenda'
import Message from './components/Message'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    agendaServices
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  const handleName = (e) => {
    const name = e.target.value
    setNewName(name)
  }

  const handlePhone = (e) => {
    const phone = e.target.value
    setNewPhone(phone)
  }

  const handleFilterName = (e) => {
    const name = e.target.value 
    setFilterName(name)
  }

  const add = (e) => {
    e.preventDefault()
    const contactoObject = {
      name: newName,
      number: newPhone
    }

    const existName = persons.some(person => person.name === newName)

    if(existName){
      const personFind = persons.find(person => person.name === newName)
      const personToChange = {
        ...personFind,
        number: newPhone
      }
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirm){
        agendaServices
          .updatePhone(personToChange.id, personToChange)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
      }
    }

    if(!existName){
      agendaServices
      .createPhone(contactoObject)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))

      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

    setNewName('')
    setNewPhone('')
  }

  const handleDelete = (person) => {
    const confirm = window.confirm(`Delete ${person.name}`)
    if(!confirm){
      return
    }
    agendaServices
      .deletePhone(person.id)
      .then(returnedPerson => setPersons(persons.filter(person => person.id !== returnedPerson.id)))
  }

  const filterAgenda = filterName === "" 
  ? persons
  : persons.filter(person => person.name.includes(filterName))

  return (
    <>
      <h2>Phonebook</h2>
      <Message message={message}/>
      <Filter 
        filterName={filterName} 
        handleFilterName={handleFilterName}
      />
      <h2>add a new</h2>
      <PersonForm 
        add={add}
        newName={newName}
        handleName={handleName}
        newPhone={newPhone}
        handlePhone={handlePhone}
      />
      <h2>Numbers</h2>
      <Persons 
        filterAgenda={filterAgenda}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default App
