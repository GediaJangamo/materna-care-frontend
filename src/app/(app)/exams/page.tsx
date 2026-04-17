"use client";

import { useState } from "react";
import {
    Search, ChevronDown,
    CheckCircle, Clock, AlertCircle, Calendar,
    FileText, Download, Eye,
    Droplets, Activity, Baby, Plus
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────
const exames = [
    {
        id: 1,
        nome: "Hemograma Completo",
        categoria: "laboratorio",
        data: "05 Fev 2026",
        semana: 29,
        status: "concluido",
        laboratorio: "Lab Central HCM",
        resultados: [
            { param: "Hemoglobina", valor: "11.2", unidade: "g/dL", ref: "11.0–16.0", estado: "atencao" },
            { param: "Hematócrito", valor: "34.1", unidade: "%", ref: "33–47", estado: "ok" },
            { param: "Leucócitos", valor: "8.200", unidade: "/µL", ref: "4.000–11.000", estado: "ok" },
            { param: "Plaquetas", valor: "210.000", unidade: "/µL", ref: "150.000–400.000", estado: "ok" },
        ],
        ficheiro: "hemograma_fev2026.pdf",
    },
    {
        id: 2,
        nome: "Glicemia em Jejum",
        categoria: "laboratorio",
        data: "05 Fev 2026",
        semana: 29,
        status: "concluido",
        laboratorio: "Lab Central HCM",
        resultados: [
            { param: "Glicemia", valor: "88", unidade: "mg/dL", ref: "70–92", estado: "ok" },
        ],
        ficheiro: "glicemia_fev2026.pdf",
    },
    {
        id: 3,
        nome: "Ecografia Morfológica",
        categoria: "ecografia",
        data: "28 Jan 2026",
        semana: 27,
        status: "concluido",
        laboratorio: "Radiologia HCM",
        resultados: [
            { param: "Peso estimado", valor: "1.020", unidade: "g", ref: "900–1.100", estado: "ok" },
            { param: "Comprimento", valor: "36", unidade: "cm", ref: "34–38", estado: "ok" },
            { param: "BCF", valor: "148", unidade: "bpm", ref: "110–160", estado: "ok" },
            { param: "Líquido amniótico", valor: "Normal", unidade: "", ref: "Normal", estado: "ok" },
            { param: "Placenta", valor: "Fúndica posterior", unidade: "", ref: "—", estado: "ok" },
        ],
        ficheiro: "ecografia_jan2026.pdf",
    },
    {
        id: 4,
        nome: "VDRL (Sífilis)",
        categoria: "laboratorio",
        data: "10 Jan 2026",
        semana: 24,
        status: "concluido",
        laboratorio: "Lab Central HCM",
        resultados: [
            { param: "VDRL", valor: "Não reactivo", unidade: "", ref: "Não reactivo", estado: "ok" },
        ],
        ficheiro: "vdrl_jan2026.pdf",
    },
    {
        id: 5,
        nome: "Teste HIV",
        categoria: "laboratorio",
        data: "10 Jan 2026",
        semana: 24,
        status: "concluido",
        laboratorio: "Lab Central HCM",
        resultados: [
            { param: "HIV", valor: "Negativo", unidade: "", ref: "Negativo", estado: "ok" },
        ],
        ficheiro: "hiv_jan2026.pdf",
    },
    {
        id: 6,
        nome: "Urina Tipo II",
        categoria: "laboratorio",
        data: "19 Fev 2026",
        semana: 31,
        status: "concluido",
        laboratorio: "Lab Central HCM",
        resultados: [
            { param: "Proteínas", valor: "Negativo", unidade: "", ref: "Negativo", estado: "ok" },
            { param: "Glicose", valor: "Negativo", unidade: "", ref: "Negativo", estado: "ok" },
            { param: "Leucócitos", valor: "5–10", unidade: "/campo", ref: "<10", estado: "ok" },
            { param: "Nitrito", valor: "Positivo", unidade: "", ref: "Negativo", estado: "atencao" },
        ],
        ficheiro: "urina_fev2026.pdf",
    },
    {
        id: 7,
        nome: "Ecografia 3º Trimestre",
        categoria: "ecografia",
        data: "02 Abr 2026",
        semana: 37,
        status: "agendado",
        laboratorio: "Radiologia HCM",
        resultados: [],
        ficheiro: null,
    },
    {
        id: 8,
        nome: "Hemograma de Controlo",
        categoria: "laboratorio",
        data: "10 Mar 2026",
        semana: 33,
        status: "agendado",
        laboratorio: "Lab Central HCM",
        resultados: [],
        ficheiro: null,
    },
];

// ─── Helpers ─────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    if (status === "concluido") return (
        <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <CheckCircle size={11} /> Concluído
        </span>
    );
    if (status === "agendado") return (
        <span className="flex items-center gap-1.5 bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <Clock size={11} /> Agendado
        </span>
    );
    return (
        <span className="flex items-center gap-1.5 bg-amber-50 text-amber-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <AlertCircle size={11} /> Pendente
        </span>
    );
}

function EstadoParam({ estado }: { estado: string }) {
    if (estado === "ok") return <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />;
    if (estado === "atencao") return <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />;
    return <span className="w-2 h-2 rounded-full bg-red-400 inline-block shrink-0" />;
}

function CategoriaBadge({ categoria }: { categoria: string }) {
    if (categoria === "ecografia") return (
        <span className="bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">Ecografia</span>
    );
    return (
        <span className="bg-sky-50 text-sky-600 text-xs font-bold px-2.5 py-1 rounded-full">Laboratorial</span>
    );
}

// ─── Main page ────────────────────────────────────────────────
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
        <div className="min-h-screen bg-gray-50">
            <div className="p-8">

                {/* Page header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Saúde Pré-natal</p>
                        <h1 className="text-2xl font-black text-gray-900">Os meus Exames</h1>
                        <p className="text-sm text-gray-400 mt-1">Resultados e exames agendados</p>
                    </div>
                    {/* 
                        Navegue para /exames/agendar ou use o router da sua framework.
                        Ex Next.js: <Link href="/exames/agendar"> 
                    */}
                    <a
                        href="/maternaCare/exams/new"
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-200 text-sm"
                    >
                        <Plus size={17} /> Agendar exame
                    </a>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                        { label: "Total de exames", value: exames.length, color: "text-gray-900", bg: "bg-white", icon: FileText, iconCl: "text-gray-400" },
                        { label: "Concluídos", value: concluidos.length, color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle, iconCl: "text-emerald-500" },
                        { label: "Agendados", value: proximos.length, color: "text-violet-600", bg: "bg-violet-50", icon: Clock, iconCl: "text-violet-500" },
                        { label: "Com atenção", value: comAlerta.length, color: "text-amber-600", bg: "bg-amber-50", icon: AlertCircle, iconCl: "text-amber-500" },
                    ].map(({ label, value, color, bg, icon: Icon, iconCl }) => (
                        <div key={label} className={`${bg} border border-gray-100 rounded-2xl p-5 shadow-sm`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <Icon size={16} className={iconCl} />
                                </div>
                            </div>
                            <p className={`text-3xl font-black ${color}`}>{value}</p>
                            <p className="text-xs font-semibold text-gray-400 mt-1">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Próximos exames banner */}
                {proximos.length > 0 && (
                    <div className="bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl p-5 mb-6 relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                        <div className="absolute -bottom-5 right-24 w-20 h-20 bg-white/5 rounded-full" />
                        <div className="relative">
                            <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-3">Próximos exames agendados</p>
                            <div className="flex flex-wrap gap-3">
                                {proximos.map(e => (
                                    <div key={e.id} className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 backdrop-blur-sm">
                                        <p className="font-black text-white text-sm">{e.nome}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="flex items-center gap-1 text-white/70 text-xs"><Calendar size={11} /> {e.data}</span>
                                            <span className="text-white/50 text-xs">{e.laboratorio}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <div className="relative">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Pesquisar exame..."
                            className="pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 transition-colors w-52"
                        />
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1">
                            {[
                                { id: "todos", label: "Todos" },
                                { id: "laboratorio", label: "Laboratorial" },
                                { id: "ecografia", label: "Ecografia" },
                            ].map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilterCat(f.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterCat === f.id
                                        ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm"
                                        : "text-gray-400 hover:text-gray-700"
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1">
                            {[
                                { id: "todos", label: "Todos" },
                                { id: "concluido", label: "Concluídos" },
                                { id: "agendado", label: "Agendados" },
                            ].map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilterStatus(f.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === f.id
                                        ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm"
                                        : "text-gray-400 hover:text-gray-700"
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Exames list */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-200">
                            <FileText size={40} />
                            <p className="text-sm mt-3 text-gray-300 font-medium">Nenhum exame encontrado</p>
                        </div>
                    ) : (
                        filtered.map((e) => (
                            <div key={e.id}>
                                {/* Row */}
                                <div
                                    onClick={() => e.status === "concluido" && setExpanded(expanded === e.id ? null : e.id)}
                                    className={`flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-none transition-colors ${e.status === "concluido" ? "cursor-pointer hover:bg-gray-50/60" : ""}`}
                                >
                                    {/* Date block */}
                                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-pink-100">
                                        <span className="text-xs font-bold text-pink-400 leading-none">{e.data.split(" ")[1]}</span>
                                        <span className="text-lg font-black text-pink-600 leading-none">{e.data.split(" ")[0]}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <p className="font-black text-gray-900 text-sm">{e.nome}</p>
                                            <CategoriaBadge categoria={e.categoria} />
                                            {e.resultados.some(r => r.estado === "atencao") && (
                                                <span className="flex items-center gap-1 bg-amber-50 text-amber-500 text-xs font-bold px-2 py-0.5 rounded-full">
                                                    <AlertCircle size={10} /> Atenção
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="flex items-center gap-1 text-xs text-gray-400"><Activity size={11} /> {e.laboratorio}</span>
                                            <span className="text-xs text-gray-300">·</span>
                                            <span className="text-xs text-gray-400">Semana {e.semana}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <StatusBadge status={e.status} />

                                        {e.status === "concluido" && e.ficheiro && (
                                            <button
                                                onClick={ev => ev.stopPropagation()}
                                                className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 hover:text-pink-500 flex items-center justify-center transition-colors"
                                            >
                                                <Download size={14} className="text-gray-400" />
                                            </button>
                                        )}

                                        {e.status === "concluido" && (
                                            <ChevronDown
                                                size={15}
                                                className={`text-gray-300 transition-transform ${expanded === e.id ? "rotate-180" : ""}`}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded results */}
                                {expanded === e.id && e.resultados.length > 0 && (
                                    <div className="px-6 pb-5 bg-gray-50/50 border-b border-gray-50">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide pt-4 mb-3">Resultados</p>
                                        <div className="grid grid-cols-2 gap-2">
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
                                            <button className="mt-3 flex items-center gap-2 text-xs font-bold text-pink-500 bg-pink-50 border border-pink-100 px-4 py-2.5 rounded-xl hover:bg-pink-100 transition-colors">
                                                <Eye size={13} /> Ver relatório completo — {e.ficheiro}
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