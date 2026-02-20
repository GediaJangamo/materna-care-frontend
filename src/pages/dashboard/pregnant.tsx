"use client";

import { useState } from "react";
import {
    Heart, Baby, Calendar, Clock, AlertTriangle, CheckCircle,
    Bell, ChevronRight, Activity, Droplets, Weight, Thermometer,
    Shield, Star, TrendingUp, MapPin, Phone, User, LogOut, Menu, X
} from "lucide-react";

const riskConfig: any = {
    low: {
        label: "Baixo Risco",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        bar: "bg-emerald-500",
        width: "w-1/3",
    },
    moderate: {
        label: "Risco Moderado",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        dot: "bg-amber-500",
        bar: "bg-amber-500",
        width: "w-2/3",
    },
    high: {
        label: "Alto Risco",
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
        dot: "bg-rose-500",
        bar: "bg-rose-500",
        width: "w-full",
    },
};

const alerts = [
    { id: 1, type: "warning", icon: AlertTriangle, message: "Exame de glicose pendente", detail: "Marcar antes de 15 Mar", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { id: 2, type: "info", icon: Bell, message: "Vacina Tdap recomendada", detail: "Entre a 27ª e 36ª semana", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { id: 3, type: "success", icon: CheckCircle, message: "Ultrassom morfológico OK", detail: "Realizado em 02 Fev 2026", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
];

const vitals = [
    { label: "Peso Atual", value: "67", unit: "kg", icon: Weight, change: "+1.2kg este mês", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pressão Arterial", value: "110/70", unit: "mmHg", icon: Activity, change: "Normal", color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Temperatura", value: "36.6", unit: "°C", icon: Thermometer, change: "Normal", color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Hidratação", value: "2.1", unit: "L/dia", icon: Droplets, change: "Meta: 2.5L", color: "text-blue-600", bg: "bg-blue-50" },
];

const trimesterMilestones = [
    { week: 8, label: "Primeiro Ultrassom", done: true },
    { week: 12, label: "Exame Genético", done: true },
    { week: 20, label: "Morfológico", done: true },
    { week: 26, label: "Agora", done: true, current: true },
    { week: 28, label: "Teste de Glicose", done: false },
    { week: 32, label: "Revisão Pré-natal", done: false },
    { week: 36, label: "Parto Planeado", done: false },
];

export default function Dashboard() {
    const [riskLevel] = useState("low");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const risk = riskConfig[riskLevel];

    const currentWeek = 26;
    const totalWeeks = 40;
    const daysLeft = (totalWeeks - currentWeek) * 7;
    const progress = Math.round((currentWeek / totalWeeks) * 100);
    const nextAppointment = { date: "24 Fev 2026", time: "14h30", doctor: "Dra. Fátima Nhantumbo", type: "Consulta Pré-natal" };
    const dueDate = "18 Mai 2026";
    const trimester = currentWeek <= 12 ? "1º Trimestre" : currentWeek <= 27 ? "2º Trimestre" : "3º Trimestre";

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* Main Content */}
            <div className=" flex flex-col min-h-screen">

                {/* Page Content */}
                <main className="flex-1 p-6 space-y-6  mx-auto w-full">

                    {/* ── Hero Card: Semana Gestacional ── */}
                    <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-6 overflow-hidden shadow-xl shadow-pink-200/40">
                        {/* BG blobs */}
                        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-purple-800/20 rounded-full blur-2xl" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                            {/* Left: week info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold text-white">
                                        {trimester}
                                    </div>
                                    <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold text-white">
                                        {daysLeft} dias restantes
                                    </div>
                                </div>
                                <h2 className="text-5xl font-black text-white mt-2">
                                    Semana <span className="text-yellow-300">{currentWeek}</span>
                                </h2>
                                <p className="text-pink-100 mt-1 text-sm">de {totalWeeks} semanas · Bebé do tamanho de um pepino 🥒</p>

                                {/* Progress bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-pink-200 mb-1.5">
                                        <span>Progresso da gravidez</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-yellow-300 to-white rounded-full transition-all duration-1000"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: baby icon */}
                            <div className="flex-shrink-0 flex items-center justify-center">
                                <div className="relative w-28 h-28">
                                    <div className="absolute inset-0 bg-white/20 backdrop-blur rounded-full border-2 border-white/30" />
                                    <div className="relative flex items-center justify-center w-full h-full">
                                        <Baby className="w-16 h-16 text-white" />
                                    </div>
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full animate-bounce" />
                                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-pink-200 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Key Metrics Row ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        {/* Data Provável do Parto */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-rose-50 rounded-xl p-3 flex-shrink-0">
                                <Calendar className="w-5 h-5 text-rose-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Data Provável do Parto</p>
                                <p className="text-xl font-black text-gray-900 mt-0.5">{dueDate}</p>
                                <p className="text-xs text-gray-400 mt-0.5">~{daysLeft} dias restantes</p>
                            </div>
                        </div>

                        {/* Próxima Consulta */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-purple-50 rounded-xl p-3 flex-shrink-0">
                                <Clock className="w-5 h-5 text-purple-500" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Próxima Consulta</p>
                                <p className="text-xl font-black text-gray-900 mt-0.5">{nextAppointment.date}</p>
                                <p className="text-xs text-gray-400 mt-0.5 truncate">{nextAppointment.time} · {nextAppointment.doctor}</p>
                            </div>
                        </div>

                        {/* Status de Risco */}
                        <div className={`rounded-2xl border shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow ${risk.bg} ${risk.border}`}>
                            <div className="bg-white rounded-xl p-3 flex-shrink-0 shadow-sm">
                                <Shield className={`w-5 h-5 ${risk.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Status de Risco</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <div className={`w-2.5 h-2.5 rounded-full ${risk.dot} animate-pulse flex-shrink-0`} />
                                    <p className={`text-lg font-black ${risk.color}`}>{risk.label}</p>
                                </div>
                                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${risk.bar} ${risk.width} rounded-full transition-all duration-700`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Alerts + Vitals ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Alertas */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Alertas & Notificações</h3>
                                <span className="text-xs font-bold bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{alerts.length}</span>
                            </div>
                            <div className="space-y-3">
                                {alerts.map((alert) => {
                                    const Icon = alert.icon;
                                    return (
                                        <div key={alert.id} className={`flex items-start gap-3 p-3.5 rounded-xl border ${alert.bg} ${alert.border}`}>
                                            <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alert.color}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-bold ${alert.color}`}>{alert.message}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{alert.detail}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Vitais */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Sinais Vitais</h3>
                                <button className="text-xs text-pink-500 font-bold hover:text-pink-600 transition-colors">Ver histórico →</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {vitals.map(({ label, value, unit, icon: Icon, change, color, bg }) => (
                                    <div key={label} className={`${bg} rounded-xl p-4`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className={`w-4 h-4 ${color}`} />
                                            <span className="text-xs font-bold text-gray-600">{label}</span>
                                        </div>
                                        <p className={`text-xl font-black ${color}`}>
                                            {value}<span className="text-xs font-semibold ml-1">{unit}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{change}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Milestones Timeline ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Linha do Tempo Gestacional</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>Semana {currentWeek} de {totalWeeks}</span>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Line */}
                            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-100" />
                            <div
                                className="absolute top-5 left-5 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700"
                                style={{ width: `${Math.min(((trimesterMilestones.findIndex(m => m.current) + 1) / trimesterMilestones.length) * 100, 100)}%` }}
                            />

                            <div className="relative flex justify-between">
                                {trimesterMilestones.map((m, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2" style={{ width: `${100 / trimesterMilestones.length}%` }}>
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 transition-all ${m.current
                                                ? "bg-gradient-to-br from-pink-500 to-purple-600 border-pink-500 shadow-lg shadow-pink-200"
                                                : m.done
                                                    ? "bg-white border-purple-400"
                                                    : "bg-gray-50 border-gray-200"
                                                }`}
                                        >
                                            {m.current ? (
                                                <Star className="w-4 h-4 text-white fill-white" />
                                            ) : m.done ? (
                                                <CheckCircle className="w-4 h-4 text-purple-500" />
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-400">{m.week}w</span>
                                            )}
                                        </div>
                                        <div className="text-center px-1">
                                            <p className={`text-[10px] font-bold leading-tight ${m.current ? "text-pink-600" : m.done ? "text-purple-600" : "text-gray-400"}`}>
                                                {m.label}
                                            </p>
                                            {!m.current && (
                                                <p className="text-[10px] text-gray-400">Sem {m.week}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Next Appointment Detail ── */}
                    <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-6 shadow-xl shadow-purple-200/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 rounded-xl p-3">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-pink-200 text-xs font-bold uppercase tracking-wide">Próxima Consulta</p>
                                <p className="text-white font-black text-lg">{nextAppointment.date} às {nextAppointment.time}</p>
                                <p className="text-pink-100 text-sm">{nextAppointment.doctor} · {nextAppointment.type}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-white/20 hover:bg-white/30 text-white font-bold text-sm px-4 py-2.5 rounded-xl border border-white/20 transition-all">
                                Reagendar
                            </button>
                            <button className="bg-white text-purple-600 hover:bg-pink-50 font-bold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all">
                                Ver detalhes
                            </button>
                        </div>
                    </div>

                </main>


            </div>
        </div>
    );
}