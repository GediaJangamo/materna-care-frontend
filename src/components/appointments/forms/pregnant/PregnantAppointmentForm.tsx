"use client";

import { useState } from "react";
import {
    Calendar, ChevronLeft, ChevronRight, MapPin,
    Stethoscope, CheckCircle, Baby, Heart, Star, ArrowRight, AlertCircle, ArrowLeft
} from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const tiposConsulta = [
    { id: "rotina", label: "Routine Checkup", desc: "Regular pregnancy follow-up", icon: Heart, color: "pink" },
    { id: "ecografia", label: "Ultrasound", desc: "Baby ultrasound exam", icon: Baby, color: "violet" },
    { id: "laboratorio", label: "Lab Tests", desc: "Laboratory exams", icon: AlertCircle, color: "sky" },
    { id: "especialista", label: "Specialist", desc: "Consultation with specialist doctor", icon: Stethoscope, color: "emerald" },
];

const profissionais = [
    { id: 1, nome: "Dr. Ana Machava", especialidade: "Obstetrician", avaliacao: 4.9, avatar: "AM", disponivel: true },
    { id: 2, nome: "Dr. Carlos Sitoe", especialidade: "Gynecologist", avaliacao: 4.8, avatar: "CS", disponivel: true },
    { id: 3, nome: "Dr. Lúcia Bila", especialidade: "Head Nurse", avaliacao: 4.7, avatar: "LB", disponivel: false },
];

const horarios = [
    "07:30", "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"
];
const ocupados = ["08:30", "10:00", "14:30"];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export default function NewAppointment() {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [tipo, setTipo] = useState<string | null>(null);
    const [profissional, setProfissional] = useState<number | null>(null);
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedHora, setSelectedHora] = useState<string | null>(null);
    const [notas, setNotas] = useState("");


    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfMonth(calYear, calMonth);

    const prevMonth = () => {
        if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
        else setCalMonth(calMonth - 1);
    };
    const nextMonth = () => {
        if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
        else setCalMonth(calMonth + 1);
    };

    const isPast = (day: number) => {
        const d = new Date(calYear, calMonth, day);
        const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return d < t;
    };

    const canNext = () => {
        if (step === 1) return !!tipo;
        if (step === 2) return !!profissional;
        if (step === 3) return !!selectedDate && !!selectedHora;
        return true;
    };

    const tipoColorMap: Record<string, { bg: string; border: string; selBorder: string; selBg: string; icon: string; iconBg: string }> = {
        pink: { bg: "bg-pink-50", border: "border-pink-200", selBorder: "border-pink-500", selBg: "bg-pink-50", icon: "text-pink-500", iconBg: "bg-pink-100" },
        violet: { bg: "bg-violet-50", border: "border-violet-200", selBorder: "border-violet-500", selBg: "bg-violet-50", icon: "text-violet-500", iconBg: "bg-violet-100" },
        sky: { bg: "bg-sky-50", border: "border-sky-200", selBorder: "border-sky-500", selBg: "bg-sky-50", icon: "text-sky-500", iconBg: "bg-sky-100" },
        emerald: { bg: "bg-emerald-50", border: "border-emerald-200", selBorder: "border-emerald-500", selBg: "bg-emerald-50", icon: "text-emerald-500", iconBg: "bg-emerald-100" },
    };

    return (
        <div lang="en" className="min-h-screen bg-gray-50 flex flex-col">

            <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
                <div className="max-w-4xl  flex items-center gap-5 px-6 py-5">

                    <button
                        onClick={() => window.history.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 text-gray-600 transition-colors shrink-0"
                    >
                        <ArrowLeft size={20} />
                    </button>


                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-black text-gray-900 leading-tight">
                            Schedule Appointment
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Book your next prenatal appointment
                        </p>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

                    <div className="flex items-center gap-0 mb-8 sm:mb-10 mt-4 sm:mt-10 max-w-xl mx-auto">
                        {[
                            { n: 1, label: "Type" },
                            { n: 2, label: "Professional" },
                            { n: 3, label: "Date & Time" },
                            { n: 4, label: "Confirm" },
                        ].map((s, i) => (
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
                                    <span className={`text-[10px] sm:text-xs font-bold whitespace-nowrap ${step >= s.n ? "text-gray-700" : "text-gray-300"}`}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < 3 && (
                                    <div className={`flex-1 h-0.5 mx-1 sm:mx-2 mb-5 sm:mb-6 rounded-full transition-all ${step > s.n ? "bg-gradient-to-r from-pink-400 to-violet-500" : "bg-gray-200"}`} aria-hidden="true" />
                                )}
                            </div>
                        ))}
                    </div>


                    {step === 1 && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-8 h-screen/2">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 ">
                                {tiposConsulta.map((t) => {
                                    const cfg = tipoColorMap[t.color];
                                    const Icon = t.icon;
                                    const sel = tipo === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setTipo(t.id)}
                                            className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${sel
                                                ? `${cfg.selBg} ${cfg.selBorder} shadow-sm`
                                                : "bg-white border-gray-100 hover:border-gray-200"
                                                }`}
                                            aria-pressed={sel}
                                        >
                                            <div className="flex items-start gap-4 ">
                                                <div className={`w-10 h-10 sm:w-11 sm:h-11 ${cfg.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                                                    <Icon size={18} className={cfg.icon} aria-hidden="true" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-black text-gray-900 text-sm mb-0.5">{t.label}</p>
                                                    <p className="text-xs text-gray-400 leading-snug">{t.desc}</p>
                                                </div>
                                                {sel && (
                                                    <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                        <CheckCircle size={12} className="text-white" aria-hidden="true" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}


                    {step === 2 && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-8 h-screen/2">
                            <h2 className="text-lg font-black text-gray-900 mb-1">Choose the professional</h2>
                            <p className="text-sm text-gray-400 mb-6">Select your preferred doctor or nurse</p>
                            <div className="flex flex-col gap-3 mb-8">
                                {profissionais.map((p) => {
                                    const sel = profissional === p.id;
                                    return (
                                        <button
                                            key={p.id}
                                            onClick={() => p.disponivel && setProfissional(p.id)}
                                            disabled={!p.disponivel}
                                            className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${!p.disponivel
                                                ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed"
                                                : sel
                                                    ? "bg-pink-50 border-pink-400 shadow-sm"
                                                    : "bg-white border-gray-100 hover:border-pink-200"
                                                }`}
                                            aria-pressed={sel}
                                            aria-label={`Select ${p.nome}, ${p.especialidade}, rating ${p.avaliacao} stars`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 ${sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white" : "bg-gradient-to-br from-pink-100 to-violet-100 text-violet-700"
                                                    }`}>
                                                    {p.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-black text-gray-900 text-sm">{p.nome}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{p.especialidade}</p>
                                                    <div className="flex items-center gap-1 mt-1.5">
                                                        <Star size={11} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                                                        <span className="text-xs font-bold text-gray-600">{p.avaliacao}</span>
                                                    </div>
                                                </div>
                                                {p.disponivel ? (
                                                    <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1.5 rounded-full shrink-0">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span className="bg-gray-100 text-gray-400 text-xs font-bold px-2 py-1.5 rounded-full shrink-0">
                                                        Unavailable
                                                    </span>
                                                )}
                                                {sel && (
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0">
                                                        <CheckCircle size={12} className="text-white" aria-hidden="true" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}


                    {step === 3 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-8 h-screen/2">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="font-black text-gray-900">{MONTHS[calMonth]} {calYear}</h3>
                                    <div className="flex items-center gap-1">
                                        <button onClick={prevMonth} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500" aria-label="Previous month">
                                            <ChevronLeft size={16} className="text-gray-500" aria-hidden="true" />
                                        </button>
                                        <button onClick={nextMonth} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500" aria-label="Next month">
                                            <ChevronRight size={16} className="text-gray-500" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 mb-2">
                                    {DAYS.map((d) => (
                                        <div key={d} className="text-center text-[10px] sm:text-xs font-bold text-gray-300 py-1">{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-y-1">
                                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} aria-hidden="true" />)}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const past = isPast(day);
                                        const isSunday = new Date(calYear, calMonth, day).getDay() === 0;
                                        const sel = selectedDate === day;
                                        const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                                        const disabled = past || isSunday;
                                        return (
                                            <button
                                                key={day}
                                                disabled={disabled}
                                                onClick={() => { setSelectedDate(day); setSelectedHora(null); }}
                                                className={`h-8 w-8 sm:h-9 sm:w-9 mx-auto rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${disabled
                                                    ? "text-gray-200 cursor-not-allowed"
                                                    : sel
                                                        ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                        : isToday
                                                            ? "bg-pink-50 text-pink-600 border border-pink-200"
                                                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                                    }`}
                                                aria-label={`${day} ${MONTHS[calMonth]} ${calYear}${sel ? ' selected' : ''}${disabled ? ' unavailable' : ''}`}
                                                aria-pressed={sel}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                                {selectedDate && (
                                    <p className="text-xs text-center text-pink-500 font-semibold mt-4">
                                        {selectedDate} {MONTHS[calMonth]} {calYear} selected
                                    </p>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                                <h3 className="font-black text-gray-900 mb-1">Available times</h3>
                                <p className="text-xs text-gray-400 mb-5">
                                    {selectedDate ? `${selectedDate} ${MONTHS[calMonth]}` : "Select a date first"}
                                </p>
                                {!selectedDate ? (
                                    <div className="flex flex-col items-center justify-center h-48 text-gray-200">
                                        <Calendar size={40} aria-hidden="true" />
                                        <p className="text-sm mt-3 text-gray-300 font-medium">Choose a date</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2">
                                        {horarios.map((h) => {
                                            const busy = ocupados.includes(h);
                                            const sel = selectedHora === h;
                                            return (
                                                <button
                                                    key={h}
                                                    disabled={busy}
                                                    onClick={() => setSelectedHora(h)}
                                                    className={`py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${busy
                                                        ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                                                        : sel
                                                            ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                            : "bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-transparent hover:border-pink-200"
                                                        }`}
                                                    aria-label={`${h}${sel ? ' selected' : ''}${busy ? ' unavailable' : ''}`}
                                                    aria-pressed={sel}
                                                >
                                                    {h}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-md bg-gradient-to-br from-pink-500 to-violet-600" aria-hidden="true" />
                                        <span className="text-xs text-gray-400">Selected</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-md bg-gray-100" aria-hidden="true" />
                                        <span className="text-xs text-gray-400">Available</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-md bg-gray-50 border border-gray-200" aria-hidden="true" />
                                        <span className="text-xs text-gray-400">Unavailable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-8 h-screen/2">
                            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 sm:p-6">
                                <h2 className="font-black text-gray-900 text-lg mb-5">Appointment summary</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                                        <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
                                            <Heart size={18} className="text-pink-500" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Appointment type</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">
                                                {tiposConsulta.find(t => t.id === tipo)?.label}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl">
                                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                                            <Stethoscope size={18} className="text-violet-500" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Professional</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">
                                                {profissionais.find(p => p.id === profissional)?.nome}
                                            </p>
                                            <p className="text-xs text-gray-400">{profissionais.find(p => p.id === profissional)?.especialidade}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
                                        <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                                            <Calendar size={18} className="text-sky-500" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Date & time</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">
                                                {selectedDate} {MONTHS[calMonth]} {calYear}
                                            </p>
                                            <p className="text-xs text-gray-400">at {selectedHora}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin size={18} className="text-gray-400" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Location</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">Maputo Central Hospital</p>
                                            <p className="text-xs text-gray-400">Eduardo Mondlane Ave, Maputo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex-1">
                                    <h3 className="font-black text-gray-900 mb-1">Additional notes</h3>
                                    <p className="text-xs text-gray-400 mb-4">Inform the doctor about anything important before the appointment (optional)</p>
                                    <textarea
                                        value={notas}
                                        onChange={(e) => setNotas(e.target.value)}
                                        placeholder="E.g., I've been feeling frequent nausea, back pain..."
                                        rows={5}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 resize-none transition-colors"
                                        aria-label="Additional notes"
                                    />
                                </div>
                                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                                    <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                                    <p className="text-xs text-amber-700 leading-relaxed font-medium">
                                        You will receive an SMS confirmation after scheduling. In case of emergency, go to the nearest emergency room.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => step > 1 && setStep(step - 1)}
                            className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${step === 1
                                ? "invisible"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600"
                                }`}
                            aria-label="Previous step"
                        >
                            <ChevronLeft size={16} aria-hidden="true" />
                            Back
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={() => canNext() && setStep(step + 1)}
                                disabled={!canNext()}
                                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                aria-label="Continue to next step"
                            >
                                Continue
                                <ArrowRight size={16} aria-hidden="true" />
                            </button>
                        ) : (
                            <button
                                className="flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                aria-label="Confirm appointment"
                            >
                                <CheckCircle size={16} aria-hidden="true" />
                                Confirm Appointment
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}