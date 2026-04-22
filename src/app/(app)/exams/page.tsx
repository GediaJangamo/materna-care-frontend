"use client";

import { useState } from "react";
import {
    Search, ChevronDown,
    CheckCircle, Clock, AlertCircle,
    FileText, Download, Eye, Plus
} from "lucide-react";


const exames = [
    {
        id: 1,
        nome: "Complete Blood Count",
        categoria: "laboratorio",
        data: "05 Feb 2026",
        semana: 29,
        status: "concluido",
        laboratorio: "Central Lab HCM",
        resultados: [
            { param: "Hemoglobin", valor: "11.2", unidade: "g/dL", ref: "11.0–16.0", estado: "atencao" },
            { param: "Hematocrit", valor: "34.1", unidade: "%", ref: "33–47", estado: "ok" },
            { param: "Leukocytes", valor: "8.200", unidade: "/µL", ref: "4.000–11.000", estado: "ok" },
            { param: "Platelets", valor: "210.000", unidade: "/µL", ref: "150.000–400.000", estado: "ok" },
        ],
        ficheiro: "cbc_feb2026.pdf",
    },
    {
        id: 2,
        nome: "Fasting Glucose",
        categoria: "laboratorio",
        data: "05 Feb 2026",
        semana: 29,
        status: "concluido",
        laboratorio: "Central Lab HCM",
        resultados: [
            { param: "Glucose", valor: "88", unidade: "mg/dL", ref: "70–92", estado: "ok" },
        ],
        ficheiro: "glucose_feb2026.pdf",
    },
    {
        id: 3,
        nome: "Morphological Ultrasound",
        categoria: "ecografia",
        data: "28 Jan 2026",
        semana: 27,
        status: "concluido",
        laboratorio: "HCM Radiology",
        resultados: [
            { param: "Estimated weight", valor: "1.020", unidade: "g", ref: "900–1.100", estado: "ok" },
            { param: "Length", valor: "36", unidade: "cm", ref: "34–38", estado: "ok" },
            { param: "Fetal heart rate", valor: "148", unidade: "bpm", ref: "110–160", estado: "ok" },
            { param: "Amniotic fluid", valor: "Normal", unidade: "", ref: "Normal", estado: "ok" },
            { param: "Placenta", valor: "Posterior fundal", unidade: "", ref: "—", estado: "ok" },
        ],
        ficheiro: "ultrasound_jan2026.pdf",
    },
    {
        id: 4,
        nome: "VDRL (Syphilis)",
        categoria: "laboratorio",
        data: "10 Jan 2026",
        semana: 24,
        status: "concluido",
        laboratorio: "Central Lab HCM",
        resultados: [
            { param: "VDRL", valor: "Non-reactive", unidade: "", ref: "Non-reactive", estado: "ok" },
        ],
        ficheiro: "vdrl_jan2026.pdf",
    },
    {
        id: 5,
        nome: "HIV Test",
        categoria: "laboratorio",
        data: "10 Jan 2026",
        semana: 24,
        status: "concluido",
        laboratorio: "Central Lab HCM",
        resultados: [
            { param: "HIV", valor: "Negative", unidade: "", ref: "Negative", estado: "ok" },
        ],
        ficheiro: "hiv_jan2026.pdf",
    },
    {
        id: 6,
        nome: "Urinalysis",
        categoria: "laboratorio",
        data: "19 Feb 2026",
        semana: 31,
        status: "concluido",
        laboratorio: "Central Lab HCM",
        resultados: [
            { param: "Protein", valor: "Negative", unidade: "", ref: "Negative", estado: "ok" },
            { param: "Glucose", valor: "Negative", unidade: "", ref: "Negative", estado: "ok" },
            { param: "Leukocytes", valor: "5–10", unidade: "/hpf", ref: "<10", estado: "ok" },
            { param: "Nitrite", valor: "Positive", unidade: "", ref: "Negative", estado: "atencao" },
        ],
        ficheiro: "urine_feb2026.pdf",
    },
    {
        id: 7,
        nome: "3rd Trimester Ultrasound",
        categoria: "ecografia",
        data: "02 Apr 2026",
        semana: 37,
        status: "agendado",
        laboratorio: "HCM Radiology",
        resultados: [],
        ficheiro: null,
    },
    {
        id: 8,
        nome: "Follow-up Blood Count",
        categoria: "laboratorio",
        data: "10 Mar 2026",
        semana: 33,
        status: "agendado",
        laboratorio: "Central Lab HCM",
        resultados: [],
        ficheiro: null,
    },
];


function StatusBadge({ status }: { status: string }) {
    if (status === "concluido") return (
        <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <CheckCircle size={11} aria-hidden="true" /> Completed
        </span>
    );
    if (status === "agendado") return (
        <span className="flex items-center gap-1.5 bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <Clock size={11} aria-hidden="true" /> Scheduled
        </span>
    );
    return (
        <span className="flex items-center gap-1.5 bg-amber-50 text-amber-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <AlertCircle size={11} aria-hidden="true" /> Pending
        </span>
    );
}

function EstadoParam({ estado }: { estado: string }) {
    if (estado === "ok") return <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" aria-label="Normal" />;
    if (estado === "atencao") return <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" aria-label="Attention needed" />;
    return <span className="w-2 h-2 rounded-full bg-red-400 inline-block shrink-0" aria-label="Critical" />;
}

function CategoriaBadge({ categoria }: { categoria: string }) {
    if (categoria === "ecografia") return (
        <span className="bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">Ultrasound</span>
    );
    return (
        <span className="bg-sky-50 text-sky-600 text-xs font-bold px-2.5 py-1 rounded-full">Lab Test</span>
    );
}


export default function ExamesPage() {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [filterCat, setFilterCat] = useState("todos");
    const [filterStatus, setFilterStatus] = useState("todos");
    const [search, setSearch] = useState("");

    const filtered = exames.filter(e => {
        const matchCat = filterCat === "todos" || e.categoria === filterCat;
        const matchStatus = filterStatus === "todos" || e.status === filterStatus;
        const matchSearch = e.nome.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchStatus && matchSearch;
    });

    const proximos = exames.filter(e => e.status === "agendado");
    const concluidos = exames.filter(e => e.status === "concluido");
    const comAlerta = exames.filter(e => e.resultados.some(r => r.estado === "atencao" || r.estado === "critico"));

    return (
        <div lang="en" className="min-h-screen bg-gray-50">
            <div className="p-4 sm:p-8">


                <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 shadow-sm border border-gray-100">
                    <div>
                        <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Prenatal Health</p>
                        <h1 className="text-2xl font-black text-gray-900">My Exams</h1>
                        <p className="text-sm text-gray-400 mt-1">Results and scheduled exams</p>
                    </div>
                    <button
                        onClick={() => window.location.href = "exams/new"}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 text-xs sm:text-sm"
                        aria-label="Schedule new exam"
                    >
                        <Plus size={14} aria-hidden="true" />
                        New exam
                    </button>
                </div>


                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    {[
                        { label: "Total exams", value: exames.length, color: "text-gray-900", bg: "bg-white", icon: FileText, iconCl: "text-gray-400" },
                        { label: "Completed", value: concluidos.length, color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle, iconCl: "text-emerald-500" },
                        { label: "Scheduled", value: proximos.length, color: "text-violet-600", bg: "bg-violet-50", icon: Clock, iconCl: "text-violet-500" },
                        { label: "Needs attention", value: comAlerta.length, color: "text-amber-600", bg: "bg-amber-50", icon: AlertCircle, iconCl: "text-amber-500" },
                    ].map(({ label, value, color, bg, icon: Icon, iconCl }) => (
                        <div key={label} className={`${bg} border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <Icon size={16} className={iconCl} aria-hidden="true" />
                                </div>
                            </div>
                            <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
                            <p className="text-xs font-semibold text-gray-400 mt-1">{label}</p>
                        </div>
                    ))}
                </div>


                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
                    <div className="relative flex-1 max-w-xs">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" aria-hidden="true" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search exam..."
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors"
                            aria-label="Search exams"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1">
                            {[
                                { id: "todos", label: "All" },
                                { id: "laboratorio", label: "Lab" },
                                { id: "ecografia", label: "Ultrasound" },
                            ].map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilterCat(f.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${filterCat === f.id
                                        ? "bg-pink-600 text-white shadow-sm"
                                        : "text-gray-400 hover:text-gray-700"
                                        }`}
                                    aria-pressed={filterCat === f.id}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1">
                            {[
                                { id: "todos", label: "All" },
                                { id: "concluido", label: "Completed" },
                                { id: "agendado", label: "Scheduled" },
                            ].map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilterStatus(f.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${filterStatus === f.id
                                        ? "bg-pink-600 text-white shadow-sm"
                                        : "text-gray-400 hover:text-gray-700"
                                        }`}
                                    aria-pressed={filterStatus === f.id}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-200">
                            <FileText size={40} aria-hidden="true" />
                            <p className="text-sm mt-3 text-gray-300 font-medium">No exams found</p>
                        </div>
                    ) : (
                        filtered.map((e) => (
                            <div key={e.id}>

                                <div
                                    onClick={() => e.status === "concluido" && setExpanded(expanded === e.id ? null : e.id)}
                                    onKeyDown={(ev) => { if ((ev.key === 'Enter' || ev.key === ' ') && e.status === "concluido") setExpanded(expanded === e.id ? null : e.id); }}
                                    className={`flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-50 last:border-none transition-colors ${e.status === "concluido" ? "cursor-pointer hover:bg-gray-50/60 focus:outline-none focus:bg-gray-50" : ""}`}
                                    tabIndex={e.status === "concluido" ? 0 : undefined}
                                    role={e.status === "concluido" ? "button" : undefined}
                                    aria-expanded={expanded === e.id}
                                >

                                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-pink-100">
                                        <span className="text-xs font-bold text-pink-400 leading-none">{e.data.split(" ")[1]}</span>
                                        <span className="text-lg font-black text-pink-600 leading-none">{e.data.split(" ")[0]}</span>
                                    </div>


                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <p className="font-black text-gray-900 text-sm">{e.nome}</p>
                                            <CategoriaBadge categoria={e.categoria} />
                                            {e.resultados.some(r => r.estado === "atencao") && (
                                                <span className="flex items-center gap-1 bg-amber-50 text-amber-500 text-xs font-bold px-2 py-0.5 rounded-full">
                                                    <AlertCircle size={10} aria-hidden="true" /> Attention
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                {e.laboratorio}
                                            </span>
                                            <span className="text-xs text-gray-300" aria-hidden="true">·</span>
                                            <span className="text-xs text-gray-400">Week {e.semana}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        <StatusBadge status={e.status} />

                                        {e.status === "concluido" && e.ficheiro && (
                                            <button
                                                onClick={(ev) => ev.stopPropagation()}
                                                className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 hover:text-pink-500 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                                                aria-label={`Download ${e.ficheiro}`}
                                            >
                                                <Download size={14} className="text-gray-400" aria-hidden="true" />
                                            </button>
                                        )}

                                        {e.status === "concluido" && (
                                            <ChevronDown
                                                size={15}
                                                className={`text-gray-300 transition-transform ${expanded === e.id ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                </div>


                                {expanded === e.id && e.resultados.length > 0 && (
                                    <div className="px-4 sm:px-6 pb-5 bg-gray-50/50 border-b border-gray-50">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide pt-4 mb-3">Results</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {e.resultados.map((r, ri) => (
                                                <div
                                                    key={ri}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border ${r.estado === "ok"
                                                        ? "bg-white border-emerald-100"
                                                        : r.estado === "atencao"
                                                            ? "bg-amber-50 border-amber-100"
                                                            : "bg-red-50 border-red-100"
                                                        }`}
                                                >
                                                    <EstadoParam estado={r.estado} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-gray-400 font-medium truncate">{r.param}</p>
                                                        <p className={`text-sm font-black ${r.estado === "ok" ? "text-gray-900" : r.estado === "atencao" ? "text-amber-700" : "text-red-700"}`}>
                                                            {r.valor} <span className="text-xs font-normal text-gray-400">{r.unidade}</span>
                                                        </p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="text-xs text-gray-300">Ref:</p>
                                                        <p className="text-xs text-gray-400 font-medium">{r.ref}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {e.ficheiro && (
                                            <button className="mt-3 flex items-center gap-2 text-xs font-bold text-pink-500 bg-pink-50 border border-pink-100 px-4 py-2.5 rounded-xl hover:bg-pink-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500">
                                                <Eye size={13} aria-hidden="true" /> View full report — {e.ficheiro}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}