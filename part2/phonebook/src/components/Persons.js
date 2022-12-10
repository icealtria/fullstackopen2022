const Persons = ({persons, handleDel}) => {

    return (<div>
        {persons.map(person => <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDel(person.id)}>delete</button>
        </li>)}
    </div>)
}

export default Persons