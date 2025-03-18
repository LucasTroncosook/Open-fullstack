const Filter = ({filterName, handleFilterName}) => {
    return(
        <div>
            <span>filter shown with</span>
            <input 
                type="text"
                value={filterName}
                onChange={handleFilterName}
            />
        </div>
    )
}

export default Filter