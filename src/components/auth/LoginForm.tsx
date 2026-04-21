"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            router.push("/dashboard");
        }, 2000);
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 mb-1">Welcome back</h1>
                <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Email or Phone
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                            Password
                        </label>
                        <button
                            type="button"
                            className="text-xs text-pink-500 hover:text-pink-600 font-semibold transition-colors"
                        >
                            Forgot?
                        </button>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    onClick={() => router.push("/dashboard")}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            Sign in to my account
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <button
                    className="text-pink-500 hover:text-pink-600 font-bold transition-colors"
                >
                    Create one for free
                </button>
            </p>

        </>
    );
}
