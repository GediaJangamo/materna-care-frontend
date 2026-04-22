"use client";

import { useState } from "react";
import {
    ArrowLeft, ArrowRight, CheckCircle, AlertCircle,
    Calendar, Activity, FileText, Zap, Baby, Droplets,
} from "lucide-react";

const tiposExame = [
    { id: "hemograma", label: "Complete Blood Count", desc: "Full blood analysis", icon: Droplets, color: "red" },
    { id: "glicemia", label: "Glucose / OGTT", desc: "Glucose tolerance test", icon: Zap, color: "amber" },
    { id: "ecografia", label: "Ultrasound", desc: "Ultrasound exam", icon: Baby, color: "violet" },
    { id: "urina", label: "Urinalysis", desc: "Urine analysis", icon: Activity, color: "sky" },
    { id: "hiv", label: "HIV / VDRL Test", desc: "Infection screening", icon: CheckCircle, color: "emerald" },
    { id: "outro", label: "Other exam", desc: "Specify in request", icon: FileText, color: "gray" },
];

const locais = [
    "Central Lab HCM",
    "HCM Radiology",
    "CS Matola",
    "CEM Private Lab",
];

const horarios = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30"];
const ocupados = ["08:30", "10:00", "14:00"];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number) { return new Date(y, m, 1).getDay(); }

const colorMap: Record<string, any> = {
    red: { icon: "text-red-500", bg: "bg-red-50", border: "border-red-200", sel: "border-red-500 bg-red-50" },
    amber: { icon: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", sel: "border-amber-500 bg-amber-50" },
    violet: { icon: "text-violet-500", bg: "bg-violet-50", border: "border-violet-200", sel: "border-violet-500 bg-violet-50" },
    sky: { icon: "text-sky-500", bg: "bg-sky-50", border: "border-sky-200", sel: "border-sky-500 bg-sky-50" },
    emerald: { icon: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", sel: "border-emerald-500 bg-emerald-50" },
    gray: { icon: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200", sel: "border-gray-400 bg-gray-50" },
};

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
        { n: 1, label: "Exam Type" },
        { n: 2, label: "Date & Location" },
        { n: 3, label: "Confirm" },
    ];

    return (
        <div lang="en" className="min-h-screen bg-gray-50 flex flex-col">
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
                <div className="max-w-4xl  flex items-center  gap-5 px-4 sm:px-6 py-4 sm:py-5">
                    <button
                        onClick={() => window.history.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 text-gray-600 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={20} aria-hidden="true" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-black text-gray-900 leading-tight">Schedule a new exam</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Book your next prenatal exam in a few easy steps</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center px-4 py-6 sm:py-10">
                <div className="w-full max-w-xl">
                    <div className="flex items-center gap-0 mb-8 sm:mb-10">
                        {steps.map((s, i) => (
                            <div key={s.n} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center gap-1.5">
                                    <div
                                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all ${step > s.n
                                            ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white"
                                            : step === s.n
                                                ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-200"
                                                : "bg-white border-2 border-gray-200 text-gray-300"
                                            }`}
                                        aria-current={step === s.n ? "step" : undefined}
                                    >
                                        {step > s.n ? <CheckCircle size={14} /> : s.n}
                                    </div>
                                    <span className={`text-[10px] sm:text-xs font-bold whitespace-nowrap ${step >= s.n ? "text-gray-700" : "text-gray-300"
                                        }`}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < 2 && (
                                    <div
                                        className={`flex-1 h-0.5 mx-1 sm:mx-2 mb-5 sm:mb-6 rounded-full transition-all ${step > s.n ? "bg-gradient-to-r from-pink-400 to-violet-500" : "bg-gray-200"
                                            }`}
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                            <h2 className="font-black text-gray-900 text-lg mb-1">Which exam do you want to schedule?</h2>
                            <p className="text-sm text-gray-400 mb-6">Select the type of exam for the request</p>
                            <div className="space-y-3">
                                {tiposExame.map((t) => {
                                    const cfg = colorMap[t.color];
                                    const Icon = t.icon;
                                    const sel = tipoSel === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setTipoSel(t.id)}
                                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-pink-500 ${sel ? cfg.sel : `bg-white ${cfg.border} hover:shadow-sm`
                                                }`}
                                            aria-pressed={sel}
                                        >
                                            <div className={`w-10 h-10 ${cfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                                <Icon size={18} className={cfg.icon} aria-hidden="true" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-black text-gray-900 text-sm">{t.label}</p>
                                                <p className="text-xs text-gray-400">{t.desc}</p>
                                            </div>
                                            {sel && (
                                                <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0">
                                                    <CheckCircle size={11} className="text-white" aria-hidden="true" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                                <p className="font-black text-gray-900 text-sm mb-4">Healthcare unit</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {locais.map(l => (
                                        <button
                                            key={l}
                                            onClick={() => setLocalSel(l)}
                                            className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${localSel === l
                                                ? "bg-pink-50 border-pink-400 text-pink-700"
                                                : "bg-white border-gray-100 text-gray-700 hover:border-pink-200"
                                                }`}
                                            aria-pressed={localSel === l}
                                        >
                                            <Activity size={14} className={localSel === l ? "text-pink-500" : "text-gray-300"} aria-hidden="true" />
                                            {l}
                                            {localSel === l && <CheckCircle size={14} className="text-pink-500 ml-auto" aria-hidden="true" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="font-black text-gray-900">{MONTHS[calMonth]} {calYear}</span>
                                    <div className="flex gap-1">
                                        <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500" aria-label="Previous month">
                                            <ArrowLeft size={14} className="text-gray-500" aria-hidden="true" />
                                        </button>
                                        <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500" aria-label="Next month">
                                            <ArrowRight size={14} className="text-gray-500" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 mb-2">
                                    {DAYS.map(d => (
                                        <div key={d} className="text-center text-xs font-bold text-gray-300 py-1">{d[0]}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-y-1">
                                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} aria-hidden="true" />)}
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
                                                className={`h-8 w-8 sm:h-9 sm:w-9 mx-auto rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${disabled
                                                    ? "text-gray-200 cursor-not-allowed"
                                                    : sel
                                                        ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                        : isToday
                                                            ? "bg-pink-50 text-pink-600 border border-pink-200"
                                                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                                    }`}
                                                aria-label={`${day} ${MONTHS[calMonth]} ${calYear}${sel ? " selected" : ""}${disabled ? " unavailable" : ""}`}
                                                aria-pressed={sel}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                                {dataSel && (
                                    <p className="text-xs text-center text-pink-500 font-semibold mt-4">
                                        {dataSel} {MONTHS[calMonth]} selected
                                    </p>
                                )}
                            </div>

                            {dataSel && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                                    <p className="font-black text-gray-900 text-sm mb-4">
                                        Available time — {dataSel} {MONTHS[calMonth]}
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
                                                    className={`py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${busy
                                                        ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                                                        : sel
                                                            ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                            : "bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-transparent hover:border-pink-200"
                                                        }`}
                                                    aria-label={`${h}${sel ? " selected" : ""}${busy ? " unavailable" : ""}`}
                                                    aria-pressed={sel}
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

                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                                <h2 className="font-black text-gray-900 text-lg mb-5">Confirm request</h2>
                                <div className="space-y-3">
                                    {[
                                        { icon: FileText, bg: "bg-pink-50", iconCl: "text-pink-500", label: "Exam", value: tiposExame.find(t => t.id === tipoSel)?.label },
                                        { icon: Calendar, bg: "bg-violet-50", iconCl: "text-violet-500", label: "Date", value: `${dataSel} ${MONTHS[calMonth]} ${calYear}`, sub: `at ${horaSel}` },
                                        { icon: Activity, bg: "bg-sky-50", iconCl: "text-sky-500", label: "Location", value: localSel },
                                    ].map(({ icon: Icon, bg, iconCl, label, value, sub }) => (
                                        <div key={label} className={`flex items-center gap-3 p-4 ${bg} rounded-xl`}>
                                            <div className="w-10 h-10 bg-white/70 rounded-xl flex items-center justify-center shrink-0">
                                                <Icon size={17} className={iconCl} aria-hidden="true" />
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

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                                <p className="text-sm font-bold text-gray-700 mb-1">Notes for the lab</p>
                                <p className="text-xs text-gray-400 mb-3">Optional — inform any special requirements</p>
                                <textarea
                                    value={notas}
                                    onChange={e => setNotas(e.target.value)}
                                    placeholder="E.g., 8h fasting, latex allergy..."
                                    rows={3}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 resize-none transition-colors"
                                    aria-label="Additional notes"
                                />
                            </div>

                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                                    Remember to bring your prenatal card and medical request on the day of the exam.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={() => step > 1 ? setStep(s => s - 1) : window.history.back()}
                            className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:border-pink-300 hover:text-pink-600 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                            aria-label={step === 1 ? "Cancel" : "Previous step"}
                        >
                            <ArrowLeft size={15} aria-hidden="true" />
                            {step === 1 ? "Cancel" : "Back"}
                        </button>

                        {step < 3 ? (
                            <button
                                onClick={() => canNext() && setStep(s => s + 1)}
                                disabled={!canNext()}
                                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                aria-label="Continue to next step"
                            >
                                Continue <ArrowRight size={15} aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                className="flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                aria-label="Confirm exam request"
                            >
                                <CheckCircle size={15} aria-hidden="true" /> Confirm request
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
