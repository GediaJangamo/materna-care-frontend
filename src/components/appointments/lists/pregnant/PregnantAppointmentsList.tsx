"use client";

import { useState } from "react";
import {
    Calendar, Clock, MapPin,
    Stethoscope, CheckCircle, Plus, Search, X, ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";


const consultasHistorico = [
    { id: 1, tipo: "Routine", data: "10 Jan 2026", hora: "09:00", profissional: "Dr. Ana Machava", especialidade: "Obstetrician", local: "HCM", status: "realizada", semanas: 24, notas: "Everything normal. Adequate weight." },
    { id: 2, tipo: "Ultrasound", data: "28 Jan 2026", hora: "10:30", profissional: "Dr. Carlos Sitoe", especialidade: "Gynecologist", local: "HCM", status: "realizada", semanas: 27, notas: "Normal fetal development. Gender confirmed." },
    { id: 3, tipo: "Lab Tests", data: "05 Feb 2026", hora: "07:30", profissional: "Dr. Lúcia Bila", especialidade: "Head Nurse", local: "CS Matola", status: "realizada", semanas: 29, notas: "Slightly low hemoglobin. Supplement prescribed." },
    { id: 4, tipo: "Routine", data: "19 Feb 2026", hora: "08:00", profissional: "Dr. Ana Machava", especialidade: "Obstetrician", local: "HCM", status: "realizada", semanas: 31, notas: "BP stable. Normal fetal movements." },
    { id: 5, tipo: "Specialist", data: "05 Mar 2026", hora: "14:00", profissional: "Dr. Carlos Sitoe", especialidade: "Gynecologist", local: "HCM", status: "agendada", semanas: 33, notas: "" },
    { id: 6, tipo: "Routine", data: "20 Mar 2026", hora: "09:30", profissional: "Dr. Ana Machava", especialidade: "Obstetrician", local: "HCM", status: "agendada", semanas: 35, notas: "" },
    { id: 7, tipo: "Ultrasound", data: "02 Apr 2026", hora: "11:00", profissional: "Dr. Carlos Sitoe", especialidade: "Gynecologist", local: "HCM", status: "agendada", semanas: 37, notas: "" },
];

function StatusBadge({ status }: any) {
    if (status === "realizada") return (
        <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <CheckCircle size={11} aria-hidden="true" /> Completed
        </span>
    );
    if (status === "agendada") return (
        <span className="flex items-center gap-1.5 bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <Clock size={11} aria-hidden="true" /> Scheduled
        </span>
    );
    return (
        <span className="flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <X size={11} aria-hidden="true" /> Canceled
        </span>
    );
}

function TipoBadge({ tipo }: any) {
    const map: any = {
        "Routine": "bg-pink-50 text-pink-600",
        "Ultrasound": "bg-violet-50 text-violet-600",
        "Lab Tests": "bg-sky-50 text-sky-600",
        "Specialist": "bg-emerald-50 text-emerald-600",
    };
    return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${map[tipo] ?? "bg-gray-100 text-gray-500"}`}>{tipo}</span>;
}

export default function ListAppointment(user: any) {
    const [filterStatus, setFilterStatus] = useState("todas");
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState<number | null>(null);
    const router = useRouter();

    const filtered = consultasHistorico.filter(c => {
        const matchStatus = filterStatus === "todas" || c.status === filterStatus;
        const matchSearch = c.profissional.toLowerCase().includes(search.toLowerCase()) ||
            c.tipo.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    return (
        <div lang="en" className="min-h-screen bg-gray-50">
            <div className="p-2 sm:p-4">

                <div className="flex flex-col items-start sm:flex-row sm:items-start sm:justify-between bg-white rounded-2xl p-4 gap-4 mb-8">
                    <div>
                        <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Prenatal Health</p>
                        <h1 className="text-2xl font-black text-gray-900">My Appointments</h1>
                        <p className="text-sm text-gray-400 mt-1">History and upcoming appointments</p>
                    </div>
                    <button
                        onClick={() => router.push("appointments/new")}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 text-xs sm:text-sm"
                        aria-label="Schedule new appointment"
                    >
                        <Plus size={14} aria-hidden="true" />
                        New appointment
                    </button>
                </div>


                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
                    <div className="relative flex-1 max-w-xs">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" aria-hidden="true" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search appointment..."
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors"
                            aria-label="Search appointments"
                        />
                    </div>

                    <div className="flex items-center gap-2 sm:ml-auto">
                        {["todas", "realizada", "agendada"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilterStatus(f)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 ${filterStatus === f
                                    ? "bg-pink-600 text-white shadow-md"
                                    : "bg-white border border-gray-100 text-gray-500 hover:border-pink-200 hover:text-pink-600"
                                    }`}
                                aria-pressed={filterStatus === f}
                            >
                                {f === "todas" ? "All" : f === "realizada" ? "Completed" : "Scheduled"}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-200">
                            <Calendar size={40} aria-hidden="true" />
                            <p className="text-sm mt-3 text-gray-300 font-medium">No appointments found</p>
                        </div>
                    ) : (
                        filtered.map((c, i) => (
                            <div key={c.id}>
                                <div
                                    className={`flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-6 py-4 cursor-pointer hover:bg-gray-50/60 transition-colors ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}
                                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(expanded === c.id ? null : c.id); }}
                                    tabIndex={0}
                                    role="button"
                                    aria-expanded={expanded === c.id}
                                >

                                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-pink-100">
                                        <span className="text-xs font-bold text-pink-400 leading-none">{c.data.split(" ")[1]}</span>
                                        <span className="text-lg font-black text-pink-600 leading-none">{c.data.split(" ")[0]}</span>
                                    </div>


                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <p className="font-black text-gray-900 text-sm">{c.tipo}</p>
                                            <TipoBadge tipo={c.tipo} />
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <Clock size={11} aria-hidden="true" /> {c.hora}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <Stethoscope size={11} aria-hidden="true" /> {c.profissional}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <MapPin size={11} aria-hidden="true" /> {c.local}
                                            </span>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full border border-gray-100">
                                            {c.semanas} wk
                                        </span>
                                        <StatusBadge status={c.status} />
                                        <ChevronDown
                                            size={15}
                                            className={`text-gray-300 transition-transform ${expanded === c.id ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>


                                {expanded === c.id && c.notas && (
                                    <div className="px-4 sm:px-6 pb-4 pt-0 border-b border-gray-50 bg-gray-50/30">
                                        <p className="text-xs text-gray-500 italic">Notes: {c.notas}</p>
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
