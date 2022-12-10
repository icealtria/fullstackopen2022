import {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons"
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() => {
        personsService
            .getAll()
            .then(reponse => {
                console.log('promise fulfilled')
                setPersons(reponse)
            })
    }, [])

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleDel = (id) => {
        const person = persons.find(person => person.id)
        if (window.confirm("Do you really want to delete this person?")) {
            personsService
                .del(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    setMessage(`Person '${person.name} has deleted from server`)
                    setTimeout(() => setMessage(null), 5000)
                })
                .catch(error => {
                    setMessage(`error: ${error.response.data.error}`)
                    setTimeout(() => setMessage(null), 5000)
                })
        }
    }

    const handleAdd = (event) => {
        event.preventDefault()
        const newObject = {
            name: newName, number: newNumber
        }
        if (persons.some(person => person.name === newObject.name)) {
            updatePerson(newObject)
        } else {
            addPerson(newObject)
            setNewName('')
            setNewNumber('')
        }
    }

    const updatePerson = (newObject) => {
        const id = persons.find(person => person.name === newObject.name).id
        personsService.update(id, newObject)
            .then(updatedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
                setMessage(`Person '${newObject.name} has updated from server`)
                setTimeout(() => setMessage(null), 5000)
            })
            .catch(error => {
                setMessage(`error: ${error.response.data.error}`)
                setTimeout(() => setMessage(null), 5000)
            })
    }

    const addPerson = (newObject) => {
        personsService
            .create(newObject)
            .then(response => {
                setPersons(persons.concat(response))
                setMessage(`Person ${newObject.name} has added from server`)
                setTimeout(() => setMessage(null), 5000)
            })
            .catch(error => {
                setMessage(`error: ${error.response.data.error}`)
                setTimeout(() => setMessage(null), 5000)
            })
    }

    return (<div>
            <h2>Phonebook</h2>
            <Notification message={message}/>
            <Filter filter={filter} setFilter={setFilter}/>
            <h2>Add a new</h2>
            <PersonForm newName={newName} newNumber={newNumber}
                        setNewNumber={setNewNumber} setNewName={setNewName}
                        handleAdd={handleAdd}/>
            <h2>Numbers</h2>
            <Persons persons={personsToShow} handleDel={handleDel}/>
        </div>)
}

export default App