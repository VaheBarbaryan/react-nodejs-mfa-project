import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import Error from "./pages/Error.jsx";
import HomePage from "./pages/HomePage.jsx";
import Setup2FA from "./pages/Setup2FA.jsx";
import Verify2FA from "./pages/Verify2FA.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                errorElement: <Error />
            },
            {
                path: '/setup-2fa',
                element: <Setup2FA />,
                errorElement: <Error />
            },
            {
                path: '/verify-2fa',
                element: <Verify2FA />,
                errorElement: <Error />
            },
        ]
    },
])

export default router