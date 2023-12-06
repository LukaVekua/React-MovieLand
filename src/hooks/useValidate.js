import { useState, useEffect } from 'react'
const useValidate = () => {
    const [user, setUser] = useState(undefined)
    const [validation, setValidation] = useState(undefined)
    useEffect(() => {
        if (user !== undefined && user === '') {
            setValidation(false)
        } else if (user !== undefined && user !== '') {
            setValidation(true)
        }
    }, [user])

    return { user, setUser, validation }
}
export default useValidate