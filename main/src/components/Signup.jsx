"use client";
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../lib/firebaseConfig'; // Adjust import path as needed
import { useRouter } from 'next/navigation'; // Correct import for router

const auth = getAuth(app);

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const [isLoading, setIsLoading] = useState(false); // State for loading
    const router = useRouter(); // Initialize router

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before validation
        setIsLoading(true); // Start loading when submit is pressed

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false); // Stop loading on error
            return;
        }

        try {
            // Check if email already exists
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setError('Email is already in use');
                setIsLoading(false); // Stop loading on error
                return;
            }

            // Create user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/login'); // Redirect to login page after successful signup
        } catch (error) {
            setError(`Error signing up: ${error.message}`);
            setIsLoading(false); // Stop loading on error
        }
    };

    const handleOAuthSignIn = async () => {
        setError(''); // Reset error message before OAuth sign-in
        setIsLoading(true); // Start loading for OAuth sign-in
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/login'); // Redirect after successful OAuth sign-in
        } catch (error) {
            setError(`Account al;ready created`);
            setIsLoading(false); // Stop loading on error
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                {error && <div className="mb-4 text-red-500 text-center">{error}</div>} {/* Display error messages in red */}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isLoading} // Disable button during loading
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <div className="loader rounded-full border-4 border-t-4 border-gray-300 h-6 w-6 animate-spin"></div>
                                <span className="ml-2">Signing Up...</span>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className="flex flex-col mt-6">
                    <button
                        onClick={handleOAuthSignIn}
                        className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                        disabled={isLoading} // Disable button during loading
                    >
                        Sign Up with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
