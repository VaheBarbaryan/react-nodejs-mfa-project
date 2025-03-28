import { useState } from "react";
import { Link } from "react-router-dom";
import { register, login } from "../service/authApi.js";

const LoginForm = ({ onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await login(username, password)
            setMessage(data.message)
            setUsername('')
            setPassword('')
            onLoginSuccess(data)
        } catch (err) {
            setUsername('')
            setPassword('')
            console.log('err', err)
            setError("Invalid login credentials")
            setMessage('')
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const { data } = await register(username, password)
            setIsRegister(false)
            setMessage(data.message)
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        } catch (err) {
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            console.log('err', err)
            setError("Something went wrong during user registration")
        }
    }

    const handleRegisterToggle = () => {
        setIsRegister((prevState) => !prevState)
        setMessage("")
        setError("")
    }

    return (
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">{ isRegister ? "Create Account" : "Login" }</h2>
            </div>
            <hr className="text-gray-200 mt-6 mb-6" />
            <p className="text-center text-gray-600 text-lg font-light">
                { isRegister ? "Looks like you are new here!" : "We are glad to see you again!" }
            </p>
            <div className="p-6">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Username</label>
                    <input
                        className="w-full p-2 border rounded mt-2"
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Your Username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Password</label>
                    <input
                        className="w-full p-2 border rounded mt-2"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        required
                    />
                </div>
                { isRegister ? (
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm">Confirm Password</label>
                        <input
                            className="w-full p-2 border rounded mt-2"
                            type="password"
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter Your Password Again"
                            required
                        />
                    </div>
                ) : ("") }
                { error && <p className="text-red-500 text-sm mb-3">{error}</p> }
                { message && <p className="text-green-600 text-sm mb-3">{message}</p> }
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                    { isRegister ? "Register" : "Login" }
                </button>
                <div>
                    <p className="pt-4 text-center text-gray-600 text-sm">
                        { isRegister ? "Already have an account? " : "Don't have an account? " }
                        {" "}
                        <Link to="" onClick={handleRegisterToggle}>
                            { isRegister ? "Login" : "Create Account"}
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default LoginForm