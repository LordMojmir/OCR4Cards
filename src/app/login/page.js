"use client";

import React, { useState, useEffect } from 'react';
import { registerUser, loginUser } from './auth';
import { useRouter } from 'next/navigation'
import { useAppContext } from "@/app/context";



export default function LoginAndRegistrationPage() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { uID, setUUID } = useAppContext();


    const router = useRouter()

    useEffect(() => {
        // console.log("Updated uID:", uID);
        setUUID("Loading Sign In")
        console.log("Use effect", uID)
    }, [uID]);

    const handleLogin = async () => {
        try {
            const user = await loginUser(email, password);
            setUUID(user.uid);
            console.log("setUUID", uID);

            router.push('/');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    const handleRegister = async () => {
        try {
            const res = await registerUser(email, password);
            if (res){
                router.push('/');
                updateUUID(res.uid)
                console.log(res.uid)
            }


            // alert('Registration successful!');
            else
                throw "Not Registered"
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="mb-4 flex justify-center">
                    <button
                        className={`py-2 px-4 text-white ${activeTab === 'login' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`py-2 px-4 text-white ml-4 ${activeTab === 'register' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>
                {activeTab === 'login' && (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleLogin}
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                )}
                {activeTab === 'register' && (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
