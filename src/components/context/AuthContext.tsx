import { createContext, useReducer, useEffect } from "react"

type ActionType =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT"; payload: string }

interface ContextInterface {
  dispatch: React.Dispatch<Object>;
  email: string;
  token: string;
}

export const AuthContext = createContext<ContextInterface | null>()

export const authReducer = (state:any, action:ActionType) => {
    switch(action.type) {
        case 'LOGIN':
            return {admin: action.payload}
        case 'LOGOUT':
            return {admin: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}:any) => {
    const [state, dispatch] = useReducer(authReducer, {
        admin:null
    })

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('admin'))

        if(admin) {
            dispatch({type: 'LOGIN', payload: admin})
        } 
    }, [])

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
    
}