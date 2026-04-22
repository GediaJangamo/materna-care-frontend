"use client";

import { useState } from "react";
import {
    Baby, Calendar, Clock, AlertTriangle, CheckCircle,
    Bell, ChevronRight, Activity, Droplets, Weight, Thermometer,
    Shield, Star, TrendingUp
} from "lucide-react";

const riskConfig: any = {
    low: {
        label: "Low Risk",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        bar: "bg-emerald-500",
        width: "w-1/3",
    },
    moderate: {
        label: "Moderate Risk",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        dot: "bg-amber-500",
        bar: "bg-amber-500",
        width: "w-2/3",
    },
    high: {
        label: "High Risk",
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
        dot: "bg-rose-500",
        bar: "bg-rose-500",
        width: "w-full",
    },
};

const alerts = [
    { id: 1, type: "warning", icon: AlertTriangle, message: "Glucose test pending", detail: "Schedule before Mar 15", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { id: 2, type: "info", icon: Bell, message: "Tdap vaccine recommended", detail: "Between 27th and 36th week", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { id: 3, type: "success", icon: CheckCircle, message: "Morphological ultrasound OK", detail: "Performed on Feb 2, 2026", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
];

const vitals = [
    { label: "Current Weight", value: "67", unit: "kg", icon: Weight, change: "+1.2kg this month", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Blood Pressure", value: "110/70", unit: "mmHg", icon: Activity, change: "Normal", color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Temperature", value: "36.6", unit: "°C", icon: Thermometer, change: "Normal", color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Hydration", value: "2.1", unit: "L/day", icon: Droplets, change: "Goal: 2.5L", color: "text-blue-600", bg: "bg-blue-50" },
];

const trimesterMilestones = [
    { week: 8, label: "First Ultrasound", done: true },
    { week: 12, label: "Genetic Screening", done: true },
    { week: 20, label: "Morphological", done: true },
    { week: 26, label: "Now", done: true, current: true },
    { week: 28, label: "Glucose Test", done: false },
    { week: 32, label: "Prenatal Review", done: false },
    { week: 36, label: "Birth Plan", done: false },
];

export default function Dashboard(user: any) {
    const [riskLevel] = useState("low");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const risk = riskConfig[riskLevel];

    const currentWeek = 26;
    const totalWeeks = 40;
    const daysLeft = (totalWeeks - currentWeek) * 7;
    const progress = Math.round((currentWeek / totalWeeks) * 100);
    const nextAppointment = { date: "Feb 24, 2026", time: "2:30 PM", doctor: "Dr. Fátima Nhantumbo", type: "Prenatal Checkup" };
    const dueDate = "May 18, 2026";
    const trimester = currentWeek <= 12 ? "1st Trimester" : currentWeek <= 27 ? "2nd Trimester" : "3rd Trimester";

    return (
        <div lang="en" className="min-h-screen bg-gray-50 font-sans">
            <div className="flex flex-col min-h-screen">
                <main role="main" className="flex-1 p-2 sm:p-2 space-y-4 sm:space-y-6 w-full">

                    {/* ── Hero Card ── */}
                    <div
                        className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-xl shadow-pink-200/40"
                        aria-label="Pregnancy progress overview"
                    >
                        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
                        <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-purple-800/20 rounded-full blur-2xl" aria-hidden="true" />

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold text-white">
                                        {trimester}
                                    </div>
                                    <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold text-white">
                                        {daysLeft} days remaining
                                    </div>
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-black text-white mt-2">
                                    Week <span className="text-yellow-300">{currentWeek}</span>
                                </h2>
                                <p className="text-pink-100 mt-1 text-sm">of {totalWeeks} weeks · Baby the size of a cucumber</p>

                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-pink-200 mb-1.5">
                                        <span>Pregnancy progress</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-yellow-300 to-white rounded-full transition-all duration-1000"
                                            style={{ width: `${progress}%` }}
                                            aria-label={`Pregnancy progress ${progress} percent`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0 flex items-center justify-center self-center">
                                <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                                    <div className="absolute inset-0 bg-white/20 backdrop-blur rounded-full border-2 border-white/30" />
                                    <div className="relative flex items-center justify-center w-full h-full">
                                        <Baby className="w-14 h-14 sm:w-16 sm:h-16 text-white" aria-hidden="true" />
                                    </div>
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full animate-bounce" aria-hidden="true" />
                                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-pink-200 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Key Metrics Row ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex items-start gap-4 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-rose-300" tabIndex={0}>
                            <div className="bg-rose-50 rounded-xl p-3 flex-shrink-0" aria-hidden="true">
                                <Calendar className="w-5 h-5 text-rose-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Estimated Due Date</p>
                                <p className="text-xl font-black text-gray-900 mt-0.5">{dueDate}</p>
                                <p className="text-xs text-gray-400 mt-0.5">~{daysLeft} days left</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex items-start gap-4 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-rose-300" tabIndex={0}>
                            <div className="bg-purple-50 rounded-xl p-3 flex-shrink-0" aria-hidden="true">
                                <Clock className="w-5 h-5 text-purple-500" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Next Appointment</p>
                                <p className="text-xl font-black text-gray-900 mt-0.5">{nextAppointment.date}</p>
                                <p className="text-xs text-gray-400 mt-0.5 truncate">{nextAppointment.time} · {nextAppointment.doctor}</p>
                            </div>
                        </div>

                        <div className={`rounded-2xl border shadow-sm p-4 sm:p-5 flex items-start gap-4 hover:shadow-md transition-shadow ${risk.bg} ${risk.border} focus-within:ring-2 focus-within:ring-rose-300`} tabIndex={0}>
                            <div className="bg-white rounded-xl p-3 flex-shrink-0 shadow-sm" aria-hidden="true">
                                <Shield className={`w-5 h-5 ${risk.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Risk Status</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <div className={`w-2.5 h-2.5 rounded-full ${risk.dot} animate-pulse flex-shrink-0`} aria-hidden="true" />
                                    <p className={`text-lg font-black ${risk.color}`}>{risk.label}</p>
                                </div>
                                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${risk.bar} ${risk.width} rounded-full transition-all duration-700`} aria-label={`Risk level: ${risk.label}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Alerts + Vitals ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Alerts & Notifications</h3>
                                <span className="text-xs font-bold bg-pink-100 text-pink-600 px-2 py-1 rounded-full" aria-label={`${alerts.length} alerts total`}>{alerts.length}</span>
                            </div>
                            <div className="space-y-3" role="list" aria-label="Alert list">
                                {alerts.map((alert) => {
                                    const Icon = alert.icon;
                                    return (
                                        <div key={alert.id} className={`flex items-start gap-3 p-3.5 rounded-xl border ${alert.bg} ${alert.border} focus-within:ring-2 focus-within:ring-rose-300`} role="listitem" tabIndex={0}>
                                            <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alert.color}`} aria-hidden="true" />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-bold ${alert.color}`}>{alert.message}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{alert.detail}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Vital Signs</h3>
                                <button
                                    className="text-xs text-pink-500 font-bold hover:text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 rounded px-1"
                                    aria-label="View full vital signs history"
                                >
                                    View history →
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {vitals.map(({ label, value, unit, icon: Icon, change, color, bg }) => (
                                    <div key={label} className={`${bg} rounded-xl p-3 sm:p-4 focus-within:ring-2 focus-within:ring-rose-300`} tabIndex={0}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} aria-hidden="true" />
                                            <span className="text-xs font-bold text-gray-600 truncate">{label}</span>
                                        </div>
                                        <p className={`text-lg sm:text-xl font-black ${color}`}>
                                            {value}<span className="text-xs font-semibold ml-1">{unit}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{change}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Milestones Timeline ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                        <div className="flex items-center justify-between mb-5 sm:mb-6">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Gestational Timeline</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500" aria-hidden="true">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>Week {currentWeek} of {totalWeeks}</span>
                            </div>
                        </div>

                        {/* Mobile: vertical */}
                        <div className="flex flex-col gap-3 sm:hidden" role="list" aria-label="Pregnancy milestones">
                            {trimesterMilestones.map((m, i) => (
                                <div key={i} className="flex items-center gap-4" role="listitem">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${m.current
                                        ? "bg-gradient-to-br from-pink-500 to-purple-600 border-pink-500 shadow-md shadow-pink-200"
                                        : m.done
                                            ? "bg-white border-purple-400"
                                            : "bg-gray-50 border-gray-200"
                                        }`} aria-label={`${m.label} ${m.current ? 'current milestone' : m.done ? 'completed' : 'upcoming'}`}>
                                        {m.current ? (
                                            <Star className="w-4 h-4 text-white fill-white" aria-hidden="true" />
                                        ) : m.done ? (
                                            <CheckCircle className="w-4 h-4 text-purple-500" aria-hidden="true" />
                                        ) : (
                                            <span className="text-[10px] font-black text-gray-400" aria-hidden="true">{m.week}w</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold ${m.current ? "text-pink-600" : m.done ? "text-purple-600" : "text-gray-400"}`}>
                                            {m.label}
                                        </p>
                                        <p className="text-xs text-gray-400">Week {m.week}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop: horizontal */}
                        <div className="relative hidden sm:block" aria-label="Pregnancy milestones timeline">
                            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-100" aria-hidden="true" />
                            <div
                                className="absolute top-5 left-5 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700"
                                style={{ width: `${Math.min(((trimesterMilestones.findIndex(m => m.current) + 1) / trimesterMilestones.length) * 100, 100)}%` }}
                                aria-hidden="true"
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
                                            aria-label={`${m.label} ${m.current ? 'current milestone' : m.done ? 'completed' : 'upcoming'}`}
                                        >
                                            {m.current ? (
                                                <Star className="w-4 h-4 text-white fill-white" aria-hidden="true" />
                                            ) : m.done ? (
                                                <CheckCircle className="w-4 h-4 text-purple-500" aria-hidden="true" />
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-400" aria-hidden="true">{m.week}w</span>
                                            )}
                                        </div>
                                        <div className="text-center px-1">
                                            <p className={`text-[10px] font-bold leading-tight ${m.current ? "text-pink-600" : m.done ? "text-purple-600" : "text-gray-400"}`}>
                                                {m.label}
                                            </p>
                                            {!m.current && (
                                                <p className="text-[10px] text-gray-400">Week {m.week}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}