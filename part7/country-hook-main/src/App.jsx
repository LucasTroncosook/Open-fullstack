import React from 'react'
import { useField, useCountry, useName } from './hooks'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country?.response?.status === 404) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
        <h3>{country.name.common} </h3>   
        <div>capital {country.capital[0]} </div>
        <div>population {country.population}</div> 
        <img src={country.flags.svg} height='100' alt={`flag of ${country.flags.alt}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const name = useName()
  const country = useCountry(name.value)

  const fetch = (e) => {
    e.preventDefault()
    name.setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App