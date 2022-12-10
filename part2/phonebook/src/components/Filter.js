const Filter = ({filter, setFilter}) => {
    const filterChange = (event) => {
        setFilter(event.target.value)
    }

    return (<>filter shown with <input value={filter} onChange={filterChange}/></>)
}
export default Filter