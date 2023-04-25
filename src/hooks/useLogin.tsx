import { useState } from "react"
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean | null>(null)
    const { dispatch } = useAuthContext()

    const login = async (email:string, password:string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://tocaya-server-production.up.railway.app/admin/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        console.log(response);
        console.log(json);
        

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            
            
            localStorage.setItem('admin', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}