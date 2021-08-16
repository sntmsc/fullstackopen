import React, { useState, useEffect } from 'react' 
import personService from './services/persons'


const Filter = ({search,eventSearch}) => {
    return(
      <div>
        search name: <input value={search} onChange={eventSearch}/>
      </div>
    )
}

const PersonForm = (props) => {

  return(
  <div>
    <form onSubmit={props.addContact}>
      <div>
        name: <input value={props.newName} onChange={props.eventNewName}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.eventNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
  )
}

const Persons = ({list, deleteContact}) => {

  return(
    <div>
      {list.map(x => 
        <div key={x.id}>
          {x.name} {x.number} <button onClick={()=>deleteContact(x)}>delete</button>
        </div>)}
    </div>
  )
}


const Notification = ({ message, notificationClass }) => {

  if (message === null) {
    return null
  }

  const notificationStyle= (n) => {

    const styles = {
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    if (n === 'green'){
      styles.color = 'green'
    }
    else if (n === 'red'){
      styles.color = 'red'
    }
    return styles
  }

  return (
    <div style={notificationStyle(notificationClass)}>
      {message}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationClass, setNotificationClass] = useState('green')
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '2262-485895',
      id:1 }
    ]) 

  const eventSearch = (event) =>
    setSearch(event.target.value);

  const eventNewName = (event) => 
  setNewName(event.target.value);

  const eventNewNumber = (event) =>
  setNewNumber(event.target.value);

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  
  const filtering= (event) => {
    const text= event.toLowerCase();
    const f= persons.filter(x => x.name.toLowerCase().indexOf(text)!==-1)
    return f
  }

  const notificationMessage = (tag,name) => {
    let message, color
    
    if (tag === 'error'){
      message = `Information of ${name} has already been removed from server`
      color = 'red'
    }
    else if (tag === 'add'){
      message = `Added ${name}`
      color = 'green'
    }
    else if (tag === 'change'){
      message = `${name}'s contact number changed`
      color = 'green'
    }
    setNotification(message)
    setNotificationClass(color)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault();
    const names = persons.map(x => x.name.toLowerCase())
    const newNameLower = newName.toLowerCase()
    const matchingName = persons.filter(x => x.name.toLowerCase() === newNameLower) 
    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if(names.indexOf(newNameLower)!==-1){
      if(window.confirm(`${matchingName[0].name} is already added to phonebook,
       replace the old number with a new one?`)===true){

        const replaceNumber = {
          name: matchingName[0].name,
          number: newNumber,
          id: matchingName[0].id
        }

        personService
        .update(matchingName[0].id, replaceNumber)
        .then(replace =>{ 
          const reloadPersons = persons.map(x => {
            if (x.id === replace.id){
              x.number = replace.number
            }
            return x
          })
            setPersons(reloadPersons)
            setNewName('')
            setNewNumber('')
            notificationMessage('change', newContact.name)
          })
          .catch(error => {
            notificationMessage('error', newContact.name)
          })
      }
      return false
    }
    if(newNumber===('')){
      window.alert('Please, enter the phone number');
      return false;
    }


    personService
      .create(newContact)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
    setNewName('');
    setNewNumber('');
    notificationMessage('add', newContact.name)
    })
  }

  const deleteContact = (x) => {
    const filterPersons = persons.filter(p =>p.id!==x.id)
   if( window.confirm(`Delete ${x.name} ?`) === true){
      personService
      .remove(x.id)
      .then(removeAction => {
        if (removeAction.statusText ==="OK"){
          setPersons(filterPersons)
        }
      })
      .catch(error => {
        notificationMessage('error', x.name)
      })
   }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter eventSearch={eventSearch} search={search}/>
     <PersonForm addContact={addContact} newName={newName}
      eventNewName={eventNewName} newNumber={newNumber}
      eventNewNumber={eventNewNumber}/>
      <h2>Numbers</h2>
      <Notification message={notification} notificationClass = {notificationClass} />
      <Persons list={filtering(search)} deleteContact={deleteContact}/>
    </div>
  )
}

export default App
