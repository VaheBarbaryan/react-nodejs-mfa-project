import { useState } from "react";
import { reset2FA, verify2FA } from "../service/authApi.js";


const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleTokenVerification = async (e) => {
        e.preventDefault();
        try {
            const { data } = await verify2FA(otp)
            onVerifySuccess(data)
        } catch (err) {
            setOtp("")
            console.log('err', err)
            setError('Invalid OTP')
        }
    }

    const handleReset = async () => {
        try {
            const { data } = await reset2FA(otp)
            onResetSuccess(data)
        } catch (err) {
            console.log('err', err)
            setError(err?.message)
        }
    }

    return (
        <form onSubmit={handleTokenVerification}
              className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">Validate TOTP</h2>
            </div>
            <hr className="text-gray-200 mt-6 mb-6"/>
            <p className="text-center text-gray-600 text-lg font-light">
                Please enter 6-digit Time based OTP to verify 2FA authentication
            </p>
            <div className="p-6">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">TOTP</label>
                    <input
                        className="w-full p-2 border rounded mt-2"
                        type="text"
                        label="TOTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter Your TOTP"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mb-3"
                >
                    Verify TOTP
                </button>
                <button
                    type="button"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                    onClick={handleReset}
                >
                    Reset 2FA
                </button>
            </div>
        </form>
    )
}

export default TwoFAVerification