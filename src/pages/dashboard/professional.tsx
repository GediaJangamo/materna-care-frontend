"use client";

import { useState } from "react";
import {
    Heart, Calendar, Clock, AlertTriangle, CheckCircle,
    Bell, ChevronRight, Shield, Star,
    MapPin, Phone, User, LogOut, Users, Stethoscope,
    FileText, BarChart2, Search, Filter, MoreVertical, Eye,
    MessageSquare, ArrowUp, Minus,
} from "lucide-react";

/* ─── Data ─── */
const stats = [
    {
        id: "total",
        label: "Gestantes Acompanhadas",
        value: 42,
        sub: "+3 este mês",
        trend: "up",
        icon: Users,
        stripe: "bg-gradient-to-r from-pink-500 to-rose-500",
        iconBg: "bg-pink-50",
        iconColor: "text-pink-600",
        valueColor: "text-pink-600",
    },
    {
        id: "alert",
        label: "Alertas Críticos",
        value: 3,
        sub: "Requer atenção imediata",
        trend: "up",
        icon: AlertTriangle,
        stripe: "bg-gradient-to-r from-red-500 to-rose-600",
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
        valueColor: "text-red-600",
        pulse: true,
    },
    {
        id: "pending",
        label: "Acompanhamento Pendente",
        value: 5,
        sub: "Sem contacto há +7 dias",
        trend: "neutral",
        icon: Clock,
        stripe: "bg-gradient-to-r from-amber-400 to-orange-500",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        valueColor: "text-amber-600",
    },
    {
        id: "today",
        label: "Consultas Hoje",
        value: 8,
        sub: "3 da tarde · 5 da manhã",
        trend: "neutral",
        icon: Calendar,
        stripe: "bg-gradient-to-r from-purple-500 to-violet-600",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        valueColor: "text-purple-600",
    },
];

const criticalAlerts = [
    { id: 1, name: "Célia Mondlane", week: 34, issue: "Pressão arterial elevada — 150/95 mmHg", time: "Há 20 min" },
    { id: 2, name: "Joana Sitoe", week: 28, issue: "Glicose em jejum: 126 mg/dL — suspeita GDM", time: "Há 1h" },
    { id: 3, name: "Maria Tembe", week: 38, issue: "Movimentos fetais reduzidos reportados", time: "Há 3h" },
];

const todayAppointments = [
    { id: 1, name: "Ana Beatriz Machava", week: 26, time: "08:00", type: "Pré-natal Rotina", status: "done", risk: "low" },
    { id: 2, name: "Fátima Cossa", week: 12, time: "08:30", type: "1º Trimestre", status: "done", risk: "low" },
    { id: 3, name: "Rosa Nhantumbo", week: 36, time: "09:00", type: "Pré-parto", status: "done", risk: "moderate" },
    { id: 4, name: "Célia Mondlane", week: 34, time: "10:00", type: "Urgência HAS", status: "next", risk: "high" },
    { id: 5, name: "Lurdes Macie", week: 20, time: "11:00", type: "Morfológico", status: "pending", risk: "low" },
    { id: 6, name: "Berta Chaúque", week: 30, time: "14:00", type: "Pré-natal Rotina", status: "pending", risk: "moderate" },
    { id: 7, name: "Isabel Guambe", week: 16, time: "15:00", type: "2º Trimestre", status: "pending", risk: "low" },
    { id: 8, name: "Sónia Baloi", week: 40, time: "16:00", type: "Termo — avaliação", status: "pending", risk: "high" },
];

const highRiskPatients = [
    { id: 1, name: "Célia Mondlane", week: 34, issue: "Hipertensão Gestacional", lastVisit: "18 Fev", nextVisit: "20 Fev", avatar: "CM" },
    { id: 2, name: "Joana Sitoe", week: 28, issue: "Diabetes Gestacional", lastVisit: "15 Fev", nextVisit: "22 Fev", avatar: "JS" },
    { id: 3, name: "Sónia Baloi", week: 40, issue: "Gravidez a Termo", lastVisit: "17 Fev", nextVisit: "Hoje", avatar: "SB" },
    { id: 4, name: "Paulina Maússe", week: 32, issue: "Placenta Prévia", lastVisit: "10 Fev", nextVisit: "24 Fev", avatar: "PM" },
];

/* ─── Lookup maps (all classes written literally) ─── */
const riskMap = {
    low: { dot: "bg-emerald-400", label: "Baixo", text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    moderate: { dot: "bg-amber-400", label: "Moderado", text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    high: { dot: "bg-red-500", label: "Alto", text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

const statusMap = {
    done: { label: "Concluída", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    next: { label: "A seguir", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
    pending: { label: "Pendente", color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
};

const avatarMap = {
    next: "bg-gradient-to-br from-purple-500 to-pink-500",
    high: "bg-gradient-to-br from-red-400 to-rose-500",
    default: "bg-gradient-to-br from-gray-300 to-gray-400",
};

const navItems = [
    { icon: BarChart2, label: "Dashboard", active: true },
    { icon: Users, label: "Minhas Gestantes" },
    { icon: Calendar, label: "Agenda" },
    { icon: AlertTriangle, label: "Alertas", badge: 3 },
    { icon: FileText, label: "Relatórios" },
    { icon: MapPin, label: "Unidades" },
    { icon: MessageSquare, label: "Mensagens" },
    { icon: User, label: "Perfil" },
];

/* ─── Component ─── */
export default function ProfessionalDashboard() {
    const [search, setSearch] = useState("");

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">

            {/* ════════ SIDEBAR ════════ */}
            <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-40 flex flex-col">

                {/* Logo */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-2 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-lg font-black text-gray-900">
                        Materna<span className="text-pink-500">Care</span>
                    </span>
                </div>

                {/* Doctor info */}
                <div className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                            FN
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">Dra. Fátima Nhantumbo</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <Stethoscope className="w-3 h-3 text-purple-500" />
                                <p className="text-xs text-purple-600 font-semibold">Obstetricista</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-700">Online · Plantão até 18h</span>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                    {navItems.map(({ icon: Icon, label, active, badge }) => (
                        <button
                            key={label}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${active
                                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-200"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="flex-1 text-left">{label}</span>
                            {badge && (
                                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-red-100 text-red-600"}`}>
                                    {badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-3 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all">
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* ════════ MAIN ════════ */}
            <div className="ml-64 flex flex-col flex-1 min-h-screen">

                {/* Top bar */}
                <header className="sticky top-0 z-20 bg-white/85 backdrop-blur border-b border-gray-100 px-6 py-3.5 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-lg font-black text-gray-900 leading-tight">Bom dia, Dra. Fátima! 👩‍⚕️</h1>
                        <p className="text-xs text-gray-400">Quarta-feira, 18 de Fevereiro de 2026</p>
                    </div>

                    {/* Search */}
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar gestante..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                            <Bell className="w-5 h-5 text-gray-500" />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
                        </button>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-sm">
                            FN
                        </div>
                    </div>
                </header>

                {/* ── Page content ── */}
                <main className="flex-1 p-6 space-y-5">

                    {/* ── Stat Cards ── */}
                    <div className="grid grid-cols-4 gap-4">
                        {stats.map(({ id, label, value, sub, trend, icon: Icon, stripe, iconBg, iconColor, valueColor, pulse }) => (
                            <div key={id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden hover:shadow-md transition-shadow">
                                {/* Stripe */}
                                <div className={`absolute top-0 left-0 right-0 h-1 ${stripe} rounded-t-2xl`} />
                                <div className="flex items-start justify-between mt-2">
                                    <div className={`${iconBg} rounded-xl p-3 relative`}>
                                        {pulse && <span className="absolute inset-0 rounded-xl bg-red-400 opacity-25 animate-ping" />}
                                        <Icon className={`w-5 h-5 ${iconColor} relative z-10`} />
                                    </div>
                                    <span className={`flex items-center text-xs font-bold ${trend === "up" ? "text-rose-500" : "text-gray-400"}`}>
                                        {trend === "up" ? <ArrowUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <p className={`text-3xl font-black ${valueColor}`}>{value}</p>
                                    <p className="text-sm font-bold text-gray-700 mt-0.5">{label}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Critical Alerts + High Risk ── */}
                    <div className="grid grid-cols-2 gap-5">

                        {/* Critical Alerts */}
                        <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-white" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Alertas Críticos</span>
                                </div>
                                <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full">
                                    {criticalAlerts.length} activos
                                </span>
                            </div>

                            <div className="divide-y divide-red-50">
                                {criticalAlerts.map((alert) => (
                                    <div key={alert.id} className="px-6 py-4 flex items-start gap-3 hover:bg-red-50/50 transition-colors">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                                            {alert.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="text-sm font-black text-gray-900">{alert.name}</p>
                                                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full border border-red-200">
                                                    Sem {alert.week}
                                                </span>
                                            </div>
                                            <p className="text-xs text-red-700 font-semibold mt-0.5">{alert.issue}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                                        </div>
                                        <div className="flex gap-1 flex-shrink-0">
                                            <button className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                                                <Phone className="w-3.5 h-3.5 text-red-500" />
                                            </button>
                                            <button className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                                                <Eye className="w-3.5 h-3.5 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-6 py-3 bg-red-50/60 border-t border-red-100">
                                <button className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1">
                                    Ver todos os alertas <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* High Risk Patients */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-white" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Gestantes de Alto Risco</span>
                                </div>
                                <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full">
                                    {highRiskPatients.length}
                                </span>
                            </div>

                            <div className="divide-y divide-gray-50">
                                {highRiskPatients.map((p) => (
                                    <div key={p.id} className="px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                                            {p.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="text-sm font-black text-gray-900">{p.name}</p>
                                                <span className="text-xs bg-red-50 text-red-600 border border-red-200 font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                                                    Sem {p.week}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{p.issue}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-400">Última: {p.lastVisit}</span>
                                                <span className="text-xs text-purple-600 font-semibold">Próxima: {p.nextVisit}</span>
                                            </div>
                                        </div>
                                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="px-6 py-3 bg-purple-50/40 border-t border-purple-100">
                                <button className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1">
                                    Ver todas <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Today's Appointments ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-black text-gray-900 uppercase tracking-wide">Consultas de Hoje</span>
                                <span className="bg-purple-100 text-purple-700 text-xs font-black px-2 py-0.5 rounded-full">
                                    {todayAppointments.length} agendadas
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl px-3 py-1.5 transition-all">
                                    <Filter className="w-3.5 h-3.5" /> Filtrar
                                </button>
                                <button className="text-xs font-bold text-pink-500 hover:text-pink-600 transition-colors">
                                    Ver agenda →
                                </button>
                            </div>
                        </div>

                        {/* Column headers */}
                        <div className="grid grid-cols-12 px-6 py-2.5 bg-gray-50 border-b border-gray-100">
                            {[["col-span-4", "Paciente"], ["col-span-2", "Horário"], ["col-span-3", "Tipo"], ["col-span-1", "Risco"], ["col-span-2", "Estado"]].map(([span, h]) => (
                                <span key={h} className={`${span} text-xs font-black text-gray-400 uppercase tracking-widest`}>{h}</span>
                            ))}
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-gray-50">
                            {todayAppointments.map((appt) => {
                                const risk = riskMap[appt.risk];
                                const status = statusMap[appt.status];
                                const isNext = appt.status === "next";
                                const avatarBg = isNext
                                    ? avatarMap.next
                                    : appt.risk === "high"
                                        ? avatarMap.high
                                        : avatarMap.default;

                                return (
                                    <div
                                        key={appt.id}
                                        className={`grid grid-cols-12 px-6 py-3.5 items-center transition-colors hover:bg-gray-50 ${isNext ? "bg-purple-50/40 border-l-4 border-purple-500" : "border-l-4 border-transparent"
                                            }`}
                                    >
                                        {/* Patient */}
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center text-white font-black text-xs flex-shrink-0`}>
                                                {appt.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{appt.name}</p>
                                                <p className="text-xs text-gray-400">Semana {appt.week}</p>
                                            </div>
                                        </div>

                                        {/* Time */}
                                        <div className="col-span-2 flex items-center gap-2">
                                            <span className={`text-sm font-black ${isNext ? "text-purple-700" : "text-gray-700"}`}>
                                                {appt.time}
                                            </span>
                                            {isNext && (
                                                <span className="text-xs bg-purple-200 text-purple-700 font-black px-2 py-0.5 rounded-full animate-pulse">
                                                    A seguir
                                                </span>
                                            )}
                                        </div>

                                        {/* Type */}
                                        <div className="col-span-3">
                                            <span className="text-xs text-gray-600 font-semibold">{appt.type}</span>
                                        </div>

                                        {/* Risk */}
                                        <div className="col-span-1 flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${risk.dot} flex-shrink-0`} />
                                            <span className={`text-xs font-bold ${risk.text}`}>{risk.label}</span>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-2 flex items-center gap-2">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.color} ${status.bg} ${status.border}`}>
                                                {status.label}
                                            </span>
                                            <button className="p-1 rounded-lg hover:bg-gray-200 transition-colors">
                                                <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Summary Banners ── */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200/40">
                            <CheckCircle className="w-6 h-6 mb-3 opacity-80" />
                            <p className="text-3xl font-black">3</p>
                            <p className="text-sm font-bold opacity-90 mt-1">Consultas Concluídas</p>
                            <p className="text-xs opacity-70 mt-0.5">Hoje até agora</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 text-white shadow-lg shadow-amber-200/40">
                            <Clock className="w-6 h-6 mb-3 opacity-80" />
                            <p className="text-3xl font-black">5</p>
                            <p className="text-sm font-bold opacity-90 mt-1">Acompanhamentos Pendentes</p>
                            <p className="text-xs opacity-70 mt-0.5">Sem contacto há +7 dias</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-pink-200/40">
                            <Star className="w-6 h-6 mb-3 opacity-80 fill-white" />
                            <p className="text-3xl font-black">42</p>
                            <p className="text-sm font-bold opacity-90 mt-1">Gestantes Sob Cuidado</p>
                            <p className="text-xs opacity-70 mt-0.5">+3 novas este mês</p>
                        </div>
                    </div>

                </main>

                <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
                    MaternaCare © 2026 · Painel Profissional · Dra. Fátima Nhantumbo ❤️
                </footer>
            </div>
        </div>
    );
}