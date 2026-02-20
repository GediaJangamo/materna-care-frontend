"use client";

import { useState } from "react";
import { Heart, Eye, EyeOff, Baby, CheckCircle, Lock, Mail, ArrowRight, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation"


export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("entrar");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [weeks, setWeeks] = useState("");
    const [role, setRole] = useState("gestante");
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Panel - Visual / Brand */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex-col items-center justify-center overflow-hidden p-12">
                {/* Background decoration */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-purple-800/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-3xl" />
                </div>

                {/* Main content */}
                <div className="relative z-10 text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mr-3 border border-white/30">
                            <Heart className="w-8 h-8 text-white fill-white" />
                        </div>
                        <span className="text-4xl font-black text-white tracking-tight">
                            Materna<span className="text-pink-200">Care</span>
                        </span>
                    </div>

                    {/* Central baby icon */}
                    <div className="relative mx-auto w-48 h-48 mb-10">
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border-2 border-white/30 shadow-2xl" />
                        <div className="relative flex items-center justify-center w-full h-full">
                            <Baby className="w-28 h-28 text-white/90" />
                        </div>
                        {/* Orbit dots */}
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

                    {/* Trust badges */}
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
                {/* Mobile logo */}
                <div className="lg:hidden flex items-center mb-8">
                    <Heart className="w-7 h-7 text-pink-500 fill-pink-500 mr-2" />
                    <span className="text-2xl font-black text-gray-900">
                        Materna<span className="text-pink-500">Care</span>
                    </span>
                </div>

                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 border border-gray-100 overflow-hidden">
                        {/* Tab switcher */}
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
                                    <div className="mb-8">
                                        <h1 className="text-2xl font-black text-gray-900 mb-1">Bem-vinda de volta </h1>
                                        <p className="text-gray-500 text-sm">Entre na sua conta para continuar</p>
                                    </div>


                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Email */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                Email ou Telefone
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="exemplo@email.com"
                                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                                                    Palavra-passe
                                                </label>
                                                <button
                                                    type="button"
                                                    className="text-xs text-pink-500 hover:text-pink-600 font-semibold transition-colors"
                                                >
                                                    Esqueceu?
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
                                            onClick={() => router.push("/maternaCare/dashboard")}
                                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    A entrar...
                                                </>
                                            ) : (
                                                <>
                                                    Entrar na minha conta
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <p className="text-center text-sm text-gray-500 mt-6">
                                        Não tem conta?{" "}
                                        <button
                                            onClick={() => setActiveTab("registar")}
                                            className="text-pink-500 hover:text-pink-600 font-bold transition-colors"
                                        >
                                            Criar gratuitamente
                                        </button>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="mb-7">
                                        <h1 className="text-2xl font-black text-gray-900 mb-1">Criar conta gratuita </h1>
                                        <p className="text-gray-500 text-sm">Comece a acompanhar a sua gravidez hoje</p>
                                    </div>


                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                Nome Completo
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

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                Número de Telefone
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

                                        {/* Weeks - only for gestante */}
                                        {role === "gestante" && (
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                    Semanas de Gravidez (opcional)
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

                                        {/* Password */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                                Palavra-passe
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Mínimo 8 caracteres"
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

                                        {/* Terms */}
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="mt-0.5 w-5 h-5 rounded-md border-2 border-gray-300 group-hover:border-pink-400 flex items-center justify-center flex-shrink-0 transition-colors bg-white">
                                                <CheckCircle className="w-3 h-3 text-pink-500 hidden" />
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                Ao criar uma conta, aceito os{" "}
                                                <span className="text-pink-500 font-semibold hover:underline cursor-pointer">Termos de Uso</span>{" "}
                                                e a{" "}
                                                <span className="text-pink-500 font-semibold hover:underline cursor-pointer">Política de Privacidade</span>{" "}
                                                do MaternaCare.
                                            </p>
                                        </label>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    A criar conta...
                                                </>
                                            ) : (
                                                <>
                                                    Criar conta gratuita
                                                    <Heart className="w-4 h-4 fill-white" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <p className="text-center text-sm text-gray-500 mt-6">
                                        Já tem conta?{" "}
                                        <button
                                            onClick={() => setActiveTab("entrar")}
                                            className="text-pink-500 hover:text-pink-600 font-bold transition-colors"
                                        >
                                            Entrar
                                        </button>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Back to home */}
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