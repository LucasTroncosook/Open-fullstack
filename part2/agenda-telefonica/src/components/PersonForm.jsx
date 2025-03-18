const PersonForm = ({add, newName, handleName, newPhone, handlePhone}) => {
    return(
        <form onSubmit={add}>
            <div>
                <span>name: </span>
                <input 
                    type="text"
                    value={newName}
                    onChange={handleName}
                />
            </div>
            <div>
                <span>phone: </span>
                <input 
                    type="text"
                    value={newPhone}
                    onChange={handlePhone}
                />
            </div>
            <button type='submit'>add</button>
      </form>
    )
}

export default PersonForm