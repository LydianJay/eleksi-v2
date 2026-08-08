import React, { useState } from "react";
import api from '../services/api';


import logo from '../../../images/logo.png';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await api.post("/login", {
                email: email,
                password: password,
            });

            window.location.href = res.data.url;
        } catch (e) {
            const msg = e.response?.data?.msg ?? "Could not login, Network issue or invalid email or password";
            setError(
                msg
            );
            setIsModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            {/* Login Card */}
            <div className="w-full max-w-95 bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mt-6 mb-1">
                    <img
                        src={logo}
                        alt="PIEP Logo"
                        className="w-40 h-auto rounded-3xl object-contain"
                    />
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                        PIEP
                    </h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                    <p className="text-lg text-gray-500 text-center mb-4 font-medium">
                        Admin Login
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {loading ? "Signing in..." : "Login"}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mb-4 text-xs text-gray-500 font-medium">
                    Powered BY SUP-TECH
                </div>
            </div>

            {/* Error Modal Replacement */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
                        <h4 className="text-lg font-bold text-red-600">
                            Error
                        </h4>
                        <p className="text-sm text-gray-600">{error}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
