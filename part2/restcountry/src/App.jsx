import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [nameCountry, setNameCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState(null)
  const [weather, setWeather] = useState({})

  const handleCountry = (e) => {
    setNameCountry(e.target.value)
  }

  const handleShow = (name) => {
    setShow(name)
  }

  useEffect(() => {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          if(!nameCountry){
            setCountries([])
          }else{
            const filterCountries = response.data.filter(c => c.name.common.includes(nameCountry))
            setCountries(filterCountries)
          }     
        })
  }, [nameCountry])

  useEffect(() => {
      if(show){
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${show}`)
          .then(response => {
            setCountries([response.data])
          })
      }
  }, [show])

  useEffect(() => {
    if(countries.length === 1) {
      const name = countries[0]?.name?.common
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&lang=es&appid=${api_key}`)
        .then(response => {
          setWeather(response.data) 
        })
    }
  }, [countries])

  return (
    <>
      <div>
        <span>find countries </span>
        <input 
          type="text"
          value={nameCountry}
          onChange={handleCountry}
        />
      </div>

      <div>
        {
          countries.length >= 10
          ? <p>Too many matches, specify another filter</p>
          : countries.length === 1
            ? countries.map(country => (
              <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital[0]}</p>
                <p>Area {country.area}</p>
                <h2>Lenguages</h2>
                <ul>
                  {
                    Object.values(country.languages).map(language => (
                      <li>{language}</li>
                    ))
                  }
                </ul>
                <img 
                  src={country.flags.png} 
                  alt={country.flags.alt}
                />

                <h2>Weather in {country?.capital[0]}</h2>
                <p>Temperature °{weather?.main?.temp} Celsius</p>
                {
                  weather.weather && (
                    <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} alt={weather?.weather[0]?.description} />
                  )
                }
                <p>Wind {weather?.wind?.gust} m/s</p>
              </div>
            ))
            : countries.map(country => (
              <>
                <div key={country.name.common}>
                  <span>{country.name.common}</span>
                  <button onClick={() => handleShow(country.name.common)}>show</button>
                </div>
              </>
            ))
        }
      </div>
    </>
  )
}

export default App