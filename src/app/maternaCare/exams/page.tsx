"use client";

import { useState } from "react";
import {
    Search, Plus, X, ChevronRight, ChevronDown,
    CheckCircle, Clock, AlertCircle, Calendar,
    FileText, Download, Eye, Filter,
    Droplets, Activity, Zap, Baby, ArrowRight,
    ArrowLeft, Star
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

const tiposExame = [
    { id: "hemograma", label: "Hemograma Completo", desc: "Análise completa do sangue", icon: Droplets, color: "red" },
    { id: "glicemia", label: "Glicemia / TOTG", desc: "Teste de tolerância à glicose", icon: Zap, color: "amber" },
    { id: "ecografia", label: "Ecografia", desc: "Exame de ultrassom", icon: Baby, color: "violet" },
    { id: "urina", label: "Urina Tipo II", desc: "Análise de urina", icon: Activity, color: "sky" },
    { id: "hiv", label: "Teste HIV / VDRL", desc: "Rastreio de infecções", icon: CheckCircle, color: "emerald" },
    { id: "outro", label: "Outro exame", desc: "Especificar no pedido", icon: FileText, color: "gray" },
];

const locais = [
    "Lab Central HCM",
    "Radiologia HCM",
    "CS Matola",
    "Lab Privado CEM",
];

const horarios = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30"];
const ocupados = ["08:30", "10:00", "14:00"];

const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }

// ─── Helpers ─────────────────────────────────────────────────
function StatusBadge({ status }) {
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

function EstadoParam({ estado }) {
    if (estado === "ok") return <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shrink-0" />;
    if (estado === "atencao") return <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />;
    return <span className="w-2 h-2 rounded-full bg-red-400 inline-block shrink-0" />;
}

function CategoriaBadge({ categoria }) {
    if (categoria === "ecografia") return (
        <span className="bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">Ecografia</span>
    );
    return (
        <span className="bg-sky-50 text-sky-600 text-xs font-bold px-2.5 py-1 rounded-full">Laboratorial</span>
    );
}

const colorMap = {
    red: { icon: "text-red-500", bg: "bg-red-50", border: "border-red-200", sel: "border-red-500 bg-red-50" },
    amber: { icon: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", sel: "border-amber-500 bg-amber-50" },
    violet: { icon: "text-violet-500", bg: "bg-violet-50", border: "border-violet-200", sel: "border-violet-500 bg-violet-50" },
    sky: { icon: "text-sky-500", bg: "bg-sky-50", border: "border-sky-200", sel: "border-sky-500 bg-sky-50" },
    emerald: { icon: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", sel: "border-emerald-500 bg-emerald-50" },
    gray: { icon: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200", sel: "border-gray-400 bg-gray-50" },
};

// ─── Scheduling drawer ────────────────────────────────────────
function AgendarExameDrawer({ onClose, onSuccess }) {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [tipoSel, setTipoSel] = useState(null);
    const [localSel, setLocalSel] = useState(null);
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [dataSel, setDataSel] = useState(null);
    const [horaSel, setHoraSel] = useState(null);
    const [notas, setNotas] = useState("");

    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDay(calYear, calMonth);

    const isPast = (day) => new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const canNext = () => {
        if (step === 1) return !!tipoSel;
        if (step === 2) return !!localSel && !!dataSel && !!horaSel;
        return true;
    };

    const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
    const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

    const steps = [{ n: 1, label: "Tipo de Exame" }, { n: 2, label: "Data & Local" }, { n: 3, label: "Confirmar" }];

    return (
        <div className="flex flex-col h-full">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                <div>
                    <h2 className="font-black text-gray-900 text-lg leading-none">Agendar Exame</h2>
                    <p className="text-xs text-gray-400 mt-1">Passo {step} de 3</p>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <X size={18} className="text-gray-500" />
                </button>
            </div>

            {/* Steps bar */}
            <div className="px-6 py-4 border-b border-gray-50 shrink-0">
                <div className="flex items-center gap-0">
                    {steps.map((s, i) => (
                        <div key={s.n} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs transition-all ${step > s.n ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white"
                                        : step === s.n ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                            : "bg-gray-100 text-gray-300"
                                    }`}>
                                    {step > s.n ? <CheckCircle size={13} /> : s.n}
                                </div>
                                <span className={`text-xs font-bold whitespace-nowrap ${step >= s.n ? "text-gray-600" : "text-gray-300"}`}>{s.label}</span>
                            </div>
                            {i < 2 && <div className={`flex-1 h-0.5 mx-1.5 mb-4 rounded-full ${step > s.n ? "bg-gradient-to-r from-pink-400 to-violet-500" : "bg-gray-100"}`} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">

                {/* Step 1 — Tipo */}
                {step === 1 && (
                    <div className="space-y-3">
                        <p className="font-black text-gray-900 mb-1">Que exame pretende agendar?</p>
                        <p className="text-xs text-gray-400 mb-4">Seleccione o tipo de exame para o pedido</p>
                        {tiposExame.map((t) => {
                            const cfg = colorMap[t.color];
                            const Icon = t.icon;
                            const sel = tipoSel === t.id;
                            return (
                                <button key={t.id} onClick={() => setTipoSel(t.id)}
                                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${sel ? cfg.sel : `bg-white ${cfg.border} hover:${cfg.sel}`}`}>
                                    <div className={`w-10 h-10 ${cfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                        <Icon size={18} className={cfg.icon} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-gray-900 text-sm">{t.label}</p>
                                        <p className="text-xs text-gray-400">{t.desc}</p>
                                    </div>
                                    {sel && (
                                        <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0">
                                            <CheckCircle size={11} className="text-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Step 2 — Data & Local */}
                {step === 2 && (
                    <div className="space-y-5">

                        {/* Local */}
                        <div>
                            <p className="font-black text-gray-900 text-sm mb-3">Unidade de saúde</p>
                            <div className="grid grid-cols-1 gap-2">
                                {locais.map(l => (
                                    <button key={l} onClick={() => setLocalSel(l)}
                                        className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all flex items-center gap-2 ${localSel === l ? "bg-pink-50 border-pink-400 text-pink-700" : "bg-white border-gray-100 text-gray-700 hover:border-pink-200"
                                            }`}>
                                        <Calendar size={14} className={localSel === l ? "text-pink-500" : "text-gray-300"} />
                                        {l}
                                        {localSel === l && <CheckCircle size={14} className="text-pink-500 ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calendário */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-black text-gray-900 text-sm">{MONTHS[calMonth]} {calYear}</span>
                                <div className="flex gap-1">
                                    <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center"><ArrowLeft size={13} className="text-gray-500" /></button>
                                    <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center"><ArrowRight size={13} className="text-gray-500" /></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 mb-1">
                                {DAYS.map(d => <div key={d} className="text-center text-xs font-bold text-gray-300 py-0.5">{d[0]}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-y-0.5">
                                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const past = isPast(day);
                                    const isSun = new Date(calYear, calMonth, day).getDay() === 0;
                                    const sel = dataSel === day;
                                    const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                                    const disabled = past || isSun;
                                    return (
                                        <button key={day} disabled={disabled} onClick={() => { setDataSel(day); setHoraSel(null); }}
                                            className={`h-8 w-8 mx-auto rounded-lg text-xs font-bold transition-all ${disabled ? "text-gray-200 cursor-not-allowed"
                                                    : sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md"
                                                        : isToday ? "bg-pink-50 text-pink-600 border border-pink-200"
                                                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                                }`}>{day}</button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Horários */}
                        {dataSel && (
                            <div>
                                <p className="font-black text-gray-900 text-sm mb-3">Horário — {dataSel} de {MONTHS[calMonth]}</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {horarios.map(h => {
                                        const busy = ocupados.includes(h);
                                        const sel = horaSel === h;
                                        return (
                                            <button key={h} disabled={busy} onClick={() => setHoraSel(h)}
                                                className={`py-2 rounded-xl text-xs font-bold transition-all ${busy ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                                                        : sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md"
                                                            : "bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                                    }`}>{h}</button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3 — Confirmar */}
                {step === 3 && (
                    <div className="space-y-3">
                        <p className="font-black text-gray-900 mb-4">Confirme o pedido</p>

                        {[
                            { icon: FileText, bg: "bg-pink-50", iconCl: "text-pink-500", label: "Exame", value: tiposExame.find(t => t.id === tipoSel)?.label },
                            { icon: Calendar, bg: "bg-violet-50", iconCl: "text-violet-500", label: "Data", value: `${dataSel} de ${MONTHS[calMonth]} de ${calYear}`, sub: `às ${horaSel}` },
                            { icon: Activity, bg: "bg-sky-50", iconCl: "text-sky-500", label: "Local", value: localSel },
                        ].map(({ icon: Icon, bg, iconCl, label, value, sub }) => (
                            <div key={label} className={`flex items-center gap-3 p-3.5 ${bg} rounded-xl`}>
                                <div className="w-9 h-9 bg-white/70 rounded-lg flex items-center justify-center shrink-0"><Icon size={16} className={iconCl} /></div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                                    <p className="font-black text-gray-900 text-sm">{value}</p>
                                    {sub && <p className="text-xs text-gray-400">{sub}</p>}
                                </div>
                            </div>
                        ))}

                        <div className="bg-white border border-gray-100 rounded-xl p-3.5">
                            <p className="text-xs font-bold text-gray-500 mb-2">Notas para o laboratório (opcional)</p>
                            <textarea value={notas} onChange={e => setNotas(e.target.value)}
                                placeholder="Ex: Jejum de 8h, alergia a látex..."
                                rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 resize-none transition-colors" />
                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                            <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700 font-medium leading-relaxed">Lembre-se de levar o cartão de gestante e o pedido médico no dia do exame.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
                <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-600 hover:border-pink-200 hover:text-pink-600 transition-all">
                    <ArrowLeft size={15} /> {step === 1 ? "Cancelar" : "Anterior"}
                </button>

                {step < 3 ? (
                    <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200 text-sm">
                        Continuar <ArrowRight size={15} />
                    </button>
                ) : (
                    <button onClick={() => onSuccess({ tipo: tipoSel, local: localSel, data: dataSel, hora: horaSel, mes: calMonth, ano: calYear })}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200 text-sm">
                        <CheckCircle size={15} /> Confirmar pedido
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────
export default function ExamesPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [filterCat, setFilterCat] = useState("todos");
    const [filterStatus, setFilterStatus] = useState("todos");
    const [search, setSearch] = useState("");
    const [successData, setSuccessData] = useState(null);

    const handleSuccess = (data) => {
        setSuccessData(data);
        setDrawerOpen(false);
    };

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
        <div className="min-h-screen bg-rose-50/40">

            {/* Backdrop */}
            {drawerOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setDrawerOpen(false)} />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                {drawerOpen && <AgendarExameDrawer onClose={() => setDrawerOpen(false)} onSuccess={handleSuccess} />}
            </div>

            <div className="p-8">

                {/* Success toast */}
                {successData && (
                    <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                            <CheckCircle size={18} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-black text-emerald-800 text-sm">Exame agendado com sucesso!</p>
                            <p className="text-xs text-emerald-600 mt-0.5">
                                {tiposExame.find(t => t.id === successData.tipo)?.label} · {successData.data} de {MONTHS[successData.mes]} · {successData.hora} · {successData.local}
                            </p>
                        </div>
                        <button onClick={() => setSuccessData(null)} className="text-emerald-400 hover:text-emerald-600 transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Page header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Saúde Pré-natal</p>
                        <h1 className="text-2xl font-black text-gray-900">Os meus Exames</h1>
                        <p className="text-sm text-gray-400 mt-1">Resultados e exames agendados</p>
                    </div>
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-200 text-sm"
                    >
                        <PlusIcon /> Agendar exame
                    </button>
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
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar exame..."
                            className="pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 transition-colors w-52" />
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1">
                            {[{ id: "todos", label: "Todos" }, { id: "laboratorio", label: "Laboratorial" }, { id: "ecografia", label: "Ecografia" }].map(f => (
                                <button key={f.id} onClick={() => setFilterCat(f.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterCat === f.id ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-700"}`}>
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-xl p-1">
                            {[{ id: "todos", label: "Todos" }, { id: "concluido", label: "Concluídos" }, { id: "agendado", label: "Agendados" }].map(f => (
                                <button key={f.id} onClick={() => setFilterStatus(f.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === f.id ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-700"}`}>
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
                        filtered.map((e, i) => (
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
                                            <ChevronDown size={15} className={`text-gray-300 transition-transform ${expanded === e.id ? "rotate-180" : ""}`} />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded results */}
                                {expanded === e.id && e.resultados.length > 0 && (
                                    <div className="px-6 pb-5 bg-gray-50/50 border-b border-gray-50">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide pt-4 mb-3">Resultados</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {e.resultados.map((r, ri) => (
                                                <div key={ri} className={`flex items-center gap-3 p-3 rounded-xl border ${r.estado === "ok" ? "bg-white border-emerald-100"
                                                        : r.estado === "atencao" ? "bg-amber-50 border-amber-100"
                                                            : "bg-red-50 border-red-100"
                                                    }`}>
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

function PlusIcon() {
    return (
        <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}