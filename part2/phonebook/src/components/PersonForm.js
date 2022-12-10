const PersonForm = ({newName, setNewName, newNumber, setNewNumber,handleAdd}) => {
    const nameChange = (event) => setNewName(event.target.value)
    const numberChange = (event) => setNewNumber(event.target.value)

    return (<form onSubmit={handleAdd}>
        <div>
            name:
            <input value={newName} onChange={nameChange}/>
        </div>
        <div>
            number:
            <input value={newNumber} onChange={numberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm