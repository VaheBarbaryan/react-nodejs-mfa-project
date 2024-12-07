import LoginForm from "../components/LoginForm.jsx";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";


function LoginPage() {
    const navigate = useNavigate();
    const { login } = useSession();

    const handleLoginSuccess = (userData) => {
        console.log('The logged in user data: ', userData)
        login(userData)
        if(!userData.isMfaActive) {
            navigate('/setup-2fa')
        } else {
            navigate('/verify-2fa')
        }
    }

    return <LoginForm onLoginSuccess={handleLoginSuccess} />
}

export default LoginPage
