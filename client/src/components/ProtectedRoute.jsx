import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";


const ProtectedRoute = () => {
    const { isLoggedIn, loading } = useSession()
    console.log('isLoggedIn', isLoggedIn)
    if(loading) {
        return <div>Loading...</div>
    }
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;