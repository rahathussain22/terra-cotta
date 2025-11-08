import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userData, setUserData] = useState(null); 
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate(); // Hook to programmatically navigate

    const goToSignup = ()=>{
        navigate("/signup")
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true)
            // Send POST request to the backend API for login
            const response = await axios.post('/api/auth/login', {
                email,    // Send the email
                password, // Send the password
            });

            // If the login is successful, store the user data and refresh token
            setUserData(response.data.user); // Store user info (including refresh token)
            localStorage.setItem('userData', JSON.stringify(response.data.user)); // Store user data in localStorage
            setSuccessMessage('Login successful!');
            setErrorMessage(''); // Clear any previous error messages

            // Redirect to the Dashboard page after successful login
            navigate('/');
        } catch (error) {
            // Handle errors (e.g., invalid credentials)
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Something went wrong. Please try again.');
            } else {
                setErrorMessage('Network error. Please try again later.');
            }
            setSuccessMessage(''); // Clear any previous success messages
        }finally{
            setIsLoading(false)
            navigate("/")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>

                {/* Display Success or Error Message */}
                {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}

                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                        {
                            isLoading ? "Loading..." : "Login"
                        }
                    </button>
                </form>

                <div className="mt-3">
                    <p className="text-gray-500">
                        Don't have an account?
                        <span
                            className="text-blue-500 cursor-pointer hover:text-blue-300 m-1"
                            onClick={goToSignup}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
