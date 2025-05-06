import supabase from "./../config/supabaseClients";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignIn () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogin = async(e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(error){
            setMessage(`${error.message}`);
        } else {
            setMessage("Login successful");
            navigate('/'); // Redirect to home page after successful login
        }
    }

    return(

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    {/**box container for sign-up heading */}
        
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Login In with Email
                        </h2>
                    </div>
        
                    {/* Form */}
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Email input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                            </label>
                            <div className="mt-2">
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                            />
                            </div>
                        </div>
        
                        {/* Password input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                            </label>
                            <div className="mt-2">
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                            />
                            </div>
                        </div>
        
                        {/* Submit button */}
                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-indigo-600"
                            >
                            Login
                            </button>
                        </div>
                        </form>
        
                        {/* Status message */}
                        {message && (
                        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
                        )}
                    </div>
                </div>
    )
}

export default SignIn;