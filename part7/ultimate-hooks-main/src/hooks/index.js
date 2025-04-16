import axios from "axios"
import { useState, useEffect } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios.get(baseUrl)
        .then(resources => setResources(resources.data))
    }, [])

    const create = (resource) => {
        axios.post(baseUrl, resource)
        .then(resource => setResources(resources.concat(resource.data)))
    }

    const service = {
        create
    }

    return [resources, service]
}