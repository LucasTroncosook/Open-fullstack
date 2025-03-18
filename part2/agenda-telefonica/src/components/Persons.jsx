const Persons = ({filterAgenda, handleDelete}) => {
    return(
        <div>
            {
                filterAgenda.map(person => (
                    <div key={person.id}>
                        <span>{person.name} {person.number}</span>
                        <button onClick={() => handleDelete(person)}>delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Persons