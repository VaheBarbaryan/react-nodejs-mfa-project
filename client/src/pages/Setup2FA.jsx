import TwoFASetup from "../components/TwoFASetup.jsx";
import { useNavigate } from "react-router-dom";


function Setup2FA() {
    const navigate = useNavigate();
    const handleSetupComplete = () => {
        navigate('/verify-2fa')
    }
    return <TwoFASetup onSetupComplete={handleSetupComplete} />
}

export default Setup2FA