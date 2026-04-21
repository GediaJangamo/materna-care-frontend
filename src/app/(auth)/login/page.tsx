"use client";

import { useState } from "react";
import { Heart, Baby, CheckCircle } from "lucide-react";
import RegisterPage from "../register/page";
import LoginForm from "@/components/auth/LoginForm";


export default function LoginPage() {
    const [activeTab, setActiveTab] = useState("entrar");

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Panel Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex-col items-center justify-center overflow-hidden p-12">

                <div className="absolute inset-0">
                    <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-purple-800/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-3xl" />
                </div>


                <div className="relative z-10 text-center">

                    <div className="flex items-center justify-center mb-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mr-3 border border-white/30">
                            <Heart className="w-8 h-8 text-white fill-white" />
                        </div>
                        <span className="text-4xl font-black text-white tracking-tight">
                            Materna<span className="text-pink-200">Care</span>
                        </span>
                    </div>


                    <div className="relative mx-auto w-48 h-48 mb-10">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border-2 border-white/30 shadow-2xl" />
                        <div className="relative flex items-center justify-center w-full h-full">
                            <Baby className="w-28 h-28 text-white/90" />
                        </div>

                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-yellow-300 rounded-full shadow-lg animate-bounce" />
                        <div
                            className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-pink-200 rounded-full shadow-lg animate-bounce"
                            style={{ animationDelay: "0.3s" }}
                        />
                        <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-purple-200 rounded-full shadow-lg animate-bounce"
                            style={{ animationDelay: "0.6s" }}
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                        Acompanhe sua gravidez<br />com confiança
                    </h2>
                    <p className="text-pink-100 text-lg leading-relaxed max-w-sm mx-auto">
                        Lembretes de consultas, hospitais próximos e o seu histórico médico sempre à mão.
                    </p>


                    <div className="mt-10 flex flex-wrap gap-3 justify-center">
                        {["100% Gratuito", "Funciona Offline", "Dados Seguros"].map((badge) => (
                            <div
                                key={badge}
                                className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                            >
                                <CheckCircle className="w-3 h-3 mr-2 text-pink-200" />
                                <span className="text-white text-sm font-medium">{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Login / Register Form */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-gray-50">

                <div className="lg:hidden flex items-center mb-8">
                    <Heart className="w-7 h-7 text-pink-500 fill-pink-500 mr-2" />
                    <span className="text-2xl font-black text-gray-900">
                        Materna<span className="text-pink-500">Care</span>
                    </span>
                </div>

                <div className="w-full max-w-md">

                    <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 border border-gray-100 overflow-hidden">

                        <div className="flex border-b border-gray-100">
                            <button
                                onClick={() => setActiveTab("entrar")}
                                className={`flex-1 py-5 text-sm font-bold tracking-wide transition-all ${activeTab === "entrar"
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                    : "bg-white text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                ENTRAR
                            </button>
                            <button
                                onClick={() => setActiveTab("registar")}
                                className={`flex-1 py-5 text-sm font-bold tracking-wide transition-all ${activeTab === "registar"
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                    : "bg-white text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                CRIAR CONTA
                            </button>
                        </div>

                        <div className="p-8">
                            {activeTab === "entrar" ? (
                                <>
                                    <LoginForm />
                                </>
                            ) : (
                                <>
                                    <RegisterPage />
                                </>
                            )}
                        </div>
                    </div>


                    <p className="text-center text-sm text-gray-400 mt-6">
                        <a href="/" className="hover:text-pink-500 transition-colors font-medium flex items-center justify-center gap-1">
                            ← Voltar ao início
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

