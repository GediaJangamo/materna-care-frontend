"use client";

import { useState } from "react";
import { Lock, Heart, CheckCircle, EyeOff, Eye } from "lucide-react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [weeks, setWeeks] = useState("");
    const [role, setRole] = useState("gestante");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    };

    return (

        <>
            <div className="mb-7">
                <h1 className="text-2xl font-black text-gray-900 mb-1">Create free account</h1>
                <p className="text-gray-500 text-sm">Start tracking your pregnancy today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ana Beatriz Machava"
                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
                        required
                    />
                </div>


                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Phone Number
                    </label>
                    <div className="flex gap-2">
                        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-3 flex items-center text-sm font-bold text-gray-600 flex-shrink-0">
                            +258
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="84 000 0000"
                            className="flex-1 px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
                            required
                        />
                    </div>
                </div>


                {role === "gestante" && (
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                            Pregnancy Weeks (optional)
                        </label>
                        <input
                            type="number"
                            value={weeks}
                            onChange={(e) => setWeeks(e.target.value)}
                            placeholder="Ex: 12"
                            min="1"
                            max="42"
                            className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
                        />
                    </div>
                )}


                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 8 characters"
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


                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="mt-0.5 w-5 h-5 rounded-md border-2 border-gray-300 group-hover:border-pink-400 flex items-center justify-center flex-shrink-0 transition-colors bg-white">
                        <CheckCircle className="w-3 h-3 text-pink-500 hidden" />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        By creating an account, I agree to the{" "}
                        <span className="text-pink-500 font-semibold hover:underline cursor-pointer">Terms of Use</span>{" "}
                        and the{" "}
                        <span className="text-pink-500 font-semibold hover:underline cursor-pointer">Privacy Policy</span>{" "}
                        of MaternaCare.
                    </p>
                </label>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        <>
                            Create free account
                            <Heart className="w-4 h-4 fill-white" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <button
                    className="text-pink-500 hover:text-pink-600 font-bold transition-colors"
                >
                    Sign in
                </button>
            </p>
        </>
    );
}
