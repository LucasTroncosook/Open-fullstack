import { useState } from "react";

export const useFiled = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const res = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        res
    }
}