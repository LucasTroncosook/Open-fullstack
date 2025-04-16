import { useState, useEffect } from "react";
import { getCountry } from "../services/restcountries";

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return{
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    useEffect(() => {
        if(name !== ""){
           getCountry(name).then(country => setCountry(country)).catch(error => setCountry(error))
        }
    }, [name])

    return country
}

export const useName = () => {
    const [value, setValue] = useState('')

    const setName = (name) => {
        setValue(name)
    }

    return {
        value,
        setName
    }
}