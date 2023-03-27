import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isLoading, error} = useLogin()

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <main className="login flex flex-col my-8">
            <h2 className="text-center text-3xl p-2">Login</h2>
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col justify-center items-center w-10/12 px-2 py-6 mx-auto bg-slate-200 rounded">
                <label className="mb-1 w-6/12">Email</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-6/12 mb-2" />
                <label className="mb-1 w-6/12">Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-6/12 mb-2" />

                <button 
                    disabled={isLoading !== null && isLoading}
                    className='bg-cyan-500 w-6/12 mx-auto mt-4 mb-2 min-w-min p-1 rounded-full' >
                        Login
                    </button>
                {error && 
                    <div className="login-error mt-4 p-4 bg-red-300 text-white rounded">
                        {error}
                    </div> }
            </form>
        </main>
    )
}

export default Login