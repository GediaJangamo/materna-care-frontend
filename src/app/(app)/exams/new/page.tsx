"use client";

import { useState } from "react";
import {
    ArrowLeft, ArrowRight, CheckCircle, AlertCircle,
    Calendar, Activity, FileText, Zap, Baby, Droplets,
    Clock,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────
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

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { return new Date(y, m, 1).getDay(); }

// ─── Color map ────────────────────────────────────────────────
const colorMap: Record<string, any> = {
    red: { icon: "text-red-500", bg: "bg-red-50", border: "border-red-200", sel: "border-red-500 bg-red-50" },
    amber: { icon: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", sel: "border-amber-500 bg-amber-50" },
    violet: { icon: "text-violet-500", bg: "bg-violet-50", border: "border-violet-200", sel: "border-violet-500 bg-violet-50" },
    sky: { icon: "text-sky-500", bg: "bg-sky-50", border: "border-sky-200", sel: "border-sky-500 bg-sky-50" },
    emerald: { icon: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", sel: "border-emerald-500 bg-emerald-50" },
    gray: { icon: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200", sel: "border-gray-400 bg-gray-50" },
};

// ─── Page ─────────────────────────────────────────────────────
export default function AgendarExamePage() {
    const today = new Date();

    const [step, setStep] = useState(1);
    const [tipoSel, setTipoSel] = useState<string | null>(null);
    const [localSel, setLocalSel] = useState<string | null>(null);
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [dataSel, setDataSel] = useState<number | null>(null);
    const [horaSel, setHoraSel] = useState<string | null>(null);
    const [notas, setNotas] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDay(calYear, calMonth);

    const isPast = (day: number) =>
        new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const canNext = () => {
        if (step === 1) return !!tipoSel;
        if (step === 2) return !!localSel && !!dataSel && !!horaSel;
        return true;
    };

    const prevMonth = () => {
        if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
        else setCalMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
        else setCalMonth(m => m + 1);
    };

    const steps = [
        { n: 1, label: "Tipo de Exame" },
        { n: 2, label: "Data & Local" },
        { n: 3, label: "Confirmar" },
    ];

    // ── Success screen ──────────────────────────────────────
    if (confirmed) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-12 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={38} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Exame Agendado!</h2>
                        <p className="text-gray-400 text-sm mb-8">O seu pedido foi registado com sucesso.</p>

                        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-left mb-8 space-y-3">
                            <div className="flex items-center gap-3">
                                <FileText size={15} className="text-pink-500 shrink-0" />
                                <span className="text-sm font-semibold text-gray-700">
                                    {tiposExame.find(t => t.id === tipoSel)?.label}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar size={15} className="text-pink-500 shrink-0" />
                                <span className="text-sm font-semibold text-gray-700">
                                    {dataSel} de {MONTHS[calMonth]} de {calYear}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={15} className="text-pink-500 shrink-0" />
                                <span className="text-sm font-semibold text-gray-700">às {horaSel}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Activity size={15} className="text-pink-500 shrink-0" />
                                <span className="text-sm font-semibold text-gray-700">{localSel}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {/* Navegar de volta à listagem */}
                            <a
                                href="/exames"
                                className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-pink-300 hover:text-pink-600 transition-colors text-sm text-center"
                            >
                                Ver todos os exames
                            </a>
                            <button
                                onClick={() => {
                                    setConfirmed(false); setStep(1); setTipoSel(null);
                                    setLocalSel(null); setDataSel(null); setHoraSel(null); setNotas("");
                                }}
                                className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-sm"
                            >
                                Novo agendamento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── Form ────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ── HEADER ── */}
            <Header />

            {/* ── MAIN ── */}
            <main className="flex-1 flex flex-col items-center px-4 py-10">
                <div className="w-full max-w-xl">

                    {/* Steps indicator */}
                    <div className="flex items-center gap-0 mb-10">
                        {steps.map((s, i) => (
                            <div key={s.n} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all ${step > s.n
                                        ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white"
                                        : step === s.n
                                            ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-200"
                                            : "bg-white border-2 border-gray-200 text-gray-300"
                                        }`}>
                                        {step > s.n ? <CheckCircle size={16} /> : s.n}
                                    </div>
                                    <span className={`text-xs font-bold whitespace-nowrap ${step >= s.n ? "text-gray-700" : "text-gray-300"}`}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < 2 && (
                                    <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all ${step > s.n
                                        ? "bg-gradient-to-r from-pink-400 to-violet-500"
                                        : "bg-gray-200"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ── STEP 1 — Tipo de exame ── */}
                    {step === 1 && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h2 className="font-black text-gray-900 text-lg mb-1">Que exame pretende agendar?</h2>
                            <p className="text-sm text-gray-400 mb-6">Seleccione o tipo de exame para o pedido</p>

                            <div className="space-y-3">
                                {tiposExame.map((t) => {
                                    const cfg = colorMap[t.color];
                                    const Icon = t.icon;
                                    const sel = tipoSel === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setTipoSel(t.id)}
                                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${sel
                                                ? cfg.sel
                                                : `bg-white ${cfg.border} hover:shadow-sm`
                                                }`}
                                        >
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
                        </div>
                    )}

                    {/* ── STEP 2 — Data & Local ── */}
                    {step === 2 && (
                        <div className="space-y-4">

                            {/* Local */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <p className="font-black text-gray-900 text-sm mb-4">Unidade de saúde</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {locais.map(l => (
                                        <button
                                            key={l}
                                            onClick={() => setLocalSel(l)}
                                            className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all flex items-center gap-2 ${localSel === l
                                                ? "bg-pink-50 border-pink-400 text-pink-700"
                                                : "bg-white border-gray-100 text-gray-700 hover:border-pink-200"
                                                }`}
                                        >
                                            <Activity size={14} className={localSel === l ? "text-pink-500" : "text-gray-300"} />
                                            {l}
                                            {localSel === l && <CheckCircle size={14} className="text-pink-500 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Calendário */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="font-black text-gray-900">{MONTHS[calMonth]} {calYear}</span>
                                    <div className="flex gap-1">
                                        <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors">
                                            <ArrowLeft size={14} className="text-gray-500" />
                                        </button>
                                        <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors">
                                            <ArrowRight size={14} className="text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 mb-2">
                                    {DAYS.map(d => (
                                        <div key={d} className="text-center text-xs font-bold text-gray-300 py-1">{d[0]}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-y-1">
                                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const past = isPast(day);
                                        const isSun = new Date(calYear, calMonth, day).getDay() === 0;
                                        const sel = dataSel === day;
                                        const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                                        const disabled = past || isSun;
                                        return (
                                            <button
                                                key={day}
                                                disabled={disabled}
                                                onClick={() => { setDataSel(day); setHoraSel(null); }}
                                                className={`h-9 w-9 mx-auto rounded-xl text-sm font-bold transition-all ${disabled
                                                    ? "text-gray-200 cursor-not-allowed"
                                                    : sel
                                                        ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                        : isToday
                                                            ? "bg-pink-50 text-pink-600 border border-pink-200"
                                                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                                {dataSel && (
                                    <p className="text-xs text-center text-pink-500 font-semibold mt-4">
                                        {dataSel} de {MONTHS[calMonth]} seleccionado
                                    </p>
                                )}
                            </div>

                            {/* Horários */}
                            {dataSel && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <p className="font-black text-gray-900 text-sm mb-4">
                                        Horário disponível — {dataSel} de {MONTHS[calMonth]}
                                    </p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {horarios.map(h => {
                                            const busy = ocupados.includes(h);
                                            const sel = horaSel === h;
                                            return (
                                                <button
                                                    key={h}
                                                    disabled={busy}
                                                    onClick={() => setHoraSel(h)}
                                                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${busy
                                                        ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                                                        : sel
                                                            ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                            : "bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-transparent hover:border-pink-200"
                                                        }`}
                                                >
                                                    {h}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── STEP 3 — Confirmar ── */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="font-black text-gray-900 text-lg mb-5">Confirme o pedido</h2>
                                <div className="space-y-3">
                                    {[
                                        { icon: FileText, bg: "bg-pink-50", iconCl: "text-pink-500", label: "Exame", value: tiposExame.find(t => t.id === tipoSel)?.label },
                                        { icon: Calendar, bg: "bg-violet-50", iconCl: "text-violet-500", label: "Data", value: `${dataSel} de ${MONTHS[calMonth]} de ${calYear}`, sub: `às ${horaSel}` },
                                        { icon: Activity, bg: "bg-sky-50", iconCl: "text-sky-500", label: "Local", value: localSel },
                                    ].map(({ icon: Icon, bg, iconCl, label, value, sub }) => (
                                        <div key={label} className={`flex items-center gap-3 p-4 ${bg} rounded-xl`}>
                                            <div className="w-10 h-10 bg-white/70 rounded-xl flex items-center justify-center shrink-0">
                                                <Icon size={17} className={iconCl} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-medium">{label}</p>
                                                <p className="font-black text-gray-900 text-sm">{value}</p>
                                                {sub && <p className="text-xs text-gray-400">{sub}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <p className="text-sm font-bold text-gray-700 mb-1">Notas para o laboratório</p>
                                <p className="text-xs text-gray-400 mb-3">Opcional — informe alguma particularidade</p>
                                <textarea
                                    value={notas}
                                    onChange={e => setNotas(e.target.value)}
                                    placeholder="Ex: Jejum de 8h, alergia a látex..."
                                    rows={3}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 resize-none transition-colors"
                                />
                            </div>

                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                                    Lembre-se de levar o cartão de gestante e o pedido médico no dia do exame.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── Navigation ── */}
                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={() => step > 1 ? setStep(s => s - 1) : window.history.back()}
                            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:border-pink-300 hover:text-pink-600 transition-all text-sm"
                        >
                            <ArrowLeft size={15} />
                            {step === 1 ? "Cancelar" : "Anterior"}
                        </button>

                        {step < 3 ? (
                            <button
                                onClick={() => canNext() && setStep(s => s + 1)}
                                disabled={!canNext()}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200 text-sm"
                            >
                                Continuar <ArrowRight size={15} />
                            </button>
                        ) : (
                            <button
                                onClick={() => setConfirmed(true)}
                                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200 text-sm"
                            >
                                <CheckCircle size={15} /> Confirmar pedido
                            </button>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

// ─── Header component ─────────────────────────────────────────
function Header() {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-xl mx-auto flex items-center gap-4 px-4 py-4">
                <button
                    onClick={() => window.history.back()}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 text-gray-500 transition-colors shrink-0"
                >
                    <ArrowLeft size={19} />
                </button>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-pink-500 uppercase tracking-widest leading-none mb-0.5">
                        Saúde Pré-natal
                    </p>
                    <h1 className="text-lg font-black text-gray-900 leading-tight">Agendar Exame</h1>
                </div>
            </div>
        </header>
    );
}