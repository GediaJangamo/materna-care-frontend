"use client";

import { useState } from "react";
import {
    Calendar, Clock, ChevronLeft, ChevronRight, MapPin,
    Stethoscope, CheckCircle, Baby, Heart, Star, ArrowRight, AlertCircle, ArrowLeft
} from "lucide-react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const tiposConsulta = [
    { id: "rotina", label: "Consulta de Rotina", desc: "Acompanhamento regular da gravidez", icon: Heart, color: "pink" },
    { id: "ecografia", label: "Ecografia", desc: "Exame de ultrassom ao bebé", icon: Baby, color: "violet" },
    { id: "laboratorio", label: "Análises", desc: "Exames laboratoriais", icon: AlertCircle, color: "sky" },
    { id: "especialista", label: "Especialista", desc: "Consulta com médico especialista", icon: Stethoscope, color: "emerald" },
];

const profissionais = [
    { id: 1, nome: "Dra. Ana Machava", especialidade: "Obstetra", avaliacao: 4.9, avatar: "AM", disponivel: true },
    { id: 2, nome: "Dr. Carlos Sitoe", especialidade: "Ginecologista", avaliacao: 4.8, avatar: "CS", disponivel: true },
    { id: 3, nome: "Dra. Lúcia Bila", especialidade: "Enfermeira-Chefe", avaliacao: 4.7, avatar: "LB", disponivel: false },
];

const horarios = [
    "07:30", "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"
];
const ocupados = ["08:30", "10:00", "14:30"];

function getDaysInMonth(year: any, month: any) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: any, month: any) {
    return new Date(year, month, 1).getDay();
}

export default function NewAppointment(user: any) {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [tipo, setTipo] = useState(null);
    const [profissional, setProfissional] = useState(null);
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHora, setSelectedHora] = useState(null);
    const [notas, setNotas] = useState("");
    const [confirmed, setConfirmed] = useState(false);

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

    const isPast = (day: any) => {
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

    const tipoColorMap: any = {
        pink: { bg: "bg-pink-50", border: "border-pink-200", selBorder: "border-pink-500", selBg: "bg-pink-50", icon: "text-pink-500", iconBg: "bg-pink-100" },
        violet: { bg: "bg-violet-50", border: "border-violet-200", selBorder: "border-violet-500", selBg: "bg-violet-50", icon: "text-violet-500", iconBg: "bg-violet-100" },
        sky: { bg: "bg-sky-50", border: "border-sky-200", selBorder: "border-sky-500", selBg: "bg-sky-50", icon: "text-sky-500", iconBg: "bg-sky-100" },
        emerald: { bg: "bg-emerald-50", border: "border-emerald-200", selBorder: "border-emerald-500", selBg: "bg-emerald-50", icon: "text-emerald-500", iconBg: "bg-emerald-100" },
    };

    if (confirmed) {
        return (
            <div className="min-h-screen bg-rose-50/40 flex items-center justify-center p-8">
                <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-12 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={38} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Consulta Agendada!</h2>
                    <p className="text-gray-400 text-sm mb-8">Receberá uma confirmação por SMS em breve.</p>

                    <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-left mb-8 space-y-3">
                        <div className="flex items-center gap-3">
                            <Calendar size={15} className="text-pink-500 shrink-0" />
                            <span className="text-sm font-semibold text-gray-700">
                                {selectedDate && `${selectedDate} de ${MONTHS[calMonth]} de ${calYear}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={15} className="text-pink-500 shrink-0" />
                            <span className="text-sm font-semibold text-gray-700">{selectedHora}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Stethoscope size={15} className="text-pink-500 shrink-0" />
                            <span className="text-sm font-semibold text-gray-700">
                                {profissionais.find(p => p.id === profissional)?.nome}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Heart size={15} className="text-pink-500 shrink-0" />
                            <span className="text-sm font-semibold text-gray-700">
                                {tiposConsulta.find(t => t.id === tipo)?.label}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => { setConfirmed(false); setStep(1); setTipo(null); setProfissional(null); setSelectedDate(null); setSelectedHora(null); setNotas(""); }}
                        className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity"
                    >
                        Agendar outra consulta
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-rose-50/40 flex flex-col">

            {/* ── HEADER ── sticky, separado do main */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
                <div className="max-w-4xl  flex items-center gap-5 px-6 py-5">
                    {/* Botão voltar */}
                    <button
                        onClick={() => window.history.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-pink-300 hover:bg-pink-50 hover:text-pink-600 text-gray-600 transition-colors shrink-0"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    {/* Título + subtítulo */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-black text-gray-900 leading-tight">
                            Agendar Consulta
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Marque a sua próxima consulta pré-natal
                        </p>
                    </div>
                </div>
            </header>

            {/* ── MAIN ── scroll independente */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-6 py-8">

                    {/* Steps indicator */}
                    <div className="flex items-center gap-0 mb-10 mt-10 max-w-xl mx-auto">
                        {[
                            { n: 1, label: "Tipo" },
                            { n: 2, label: "Profissional" },
                            { n: 3, label: "Data & Hora" },
                            { n: 4, label: "Confirmar" },
                        ].map((s, i) => (
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
                                {i < 3 && (
                                    <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all ${step > s.n ? "bg-gradient-to-r from-pink-400 to-violet-500" : "bg-gray-200"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1 — Tipo de consulta */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-lg font-black text-gray-900 mb-1">Que tipo de consulta precisa?</h2>
                            <p className="text-sm text-gray-400 mb-6">Seleccione o tipo de consulta que deseja agendar</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {tiposConsulta.map((t: any) => {
                                    const cfg = tipoColorMap[t.color];
                                    const Icon = t.icon;
                                    const sel = tipo === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setTipo(t.id)}
                                            className={`text-left p-5 rounded-2xl border-2 transition-all ${sel
                                                ? `${cfg.selBg} ${cfg.selBorder} shadow-sm`
                                                : "bg-white border-gray-100 hover:border-gray-200"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-11 h-11 ${cfg.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                                                    <Icon size={20} className={cfg.icon} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-black text-gray-900 text-sm mb-0.5">{t.label}</p>
                                                    <p className="text-xs text-gray-400 leading-snug">{t.desc}</p>
                                                </div>
                                                {sel && (
                                                    <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                        <CheckCircle size={12} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2 — Profissional */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-lg font-black text-gray-900 mb-1">Escolha o profissional</h2>
                            <p className="text-sm text-gray-400 mb-6">Seleccione o médico ou enfermeira da sua preferência</p>

                            <div className="flex flex-col gap-3 mb-8">
                                {profissionais.map((p: any) => {
                                    const sel = profissional === p.id;
                                    return (
                                        <button
                                            key={p.id}
                                            onClick={() => p.disponivel && setProfissional(p.id)}
                                            disabled={!p.disponivel}
                                            className={`text-left p-5 rounded-2xl border-2 transition-all ${!p.disponivel
                                                ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed"
                                                : sel
                                                    ? "bg-pink-50 border-pink-400 shadow-sm"
                                                    : "bg-white border-gray-100 hover:border-pink-200"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white" : "bg-gradient-to-br from-pink-100 to-violet-100 text-violet-700"
                                                    }`}>
                                                    {p.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-black text-gray-900 text-sm">{p.nome}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{p.especialidade}</p>
                                                    <div className="flex items-center gap-1 mt-1.5">
                                                        <Star size={11} className="text-amber-400 fill-amber-400" />
                                                        <span className="text-xs font-bold text-gray-600">{p.avaliacao}</span>
                                                    </div>
                                                </div>
                                                {p.disponivel ? (
                                                    <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                                        Disponível
                                                    </span>
                                                ) : (
                                                    <span className="bg-gray-100 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
                                                        Indisponível
                                                    </span>
                                                )}
                                                {sel && (
                                                    <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0">
                                                        <CheckCircle size={14} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 3 — Data & Hora */}
                    {step === 3 && (
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="font-black text-gray-900">{MONTHS[calMonth]} {calYear}</h3>
                                    <div className="flex items-center gap-1">
                                        <button onClick={prevMonth} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors">
                                            <ChevronLeft size={16} className="text-gray-500" />
                                        </button>
                                        <button onClick={nextMonth} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors">
                                            <ChevronRight size={16} className="text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 mb-2">
                                    {DAYS.map((d) => (
                                        <div key={d} className="text-center text-xs font-bold text-gray-300 py-1">{d}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-y-1">
                                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day: any = i + 1;
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
                                {selectedDate && (
                                    <p className="text-xs text-center text-pink-500 font-semibold mt-4">
                                        {selectedDate} de {MONTHS[calMonth]} de {calYear} seleccionado
                                    </p>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <h3 className="font-black text-gray-900 mb-1">Horários disponíveis</h3>
                                <p className="text-xs text-gray-400 mb-5">
                                    {selectedDate ? `${selectedDate} de ${MONTHS[calMonth]}` : "Seleccione uma data primeiro"}
                                </p>
                                {!selectedDate ? (
                                    <div className="flex flex-col items-center justify-center h-48 text-gray-200">
                                        <Calendar size={40} />
                                        <p className="text-sm mt-3 text-gray-300 font-medium">Escolha uma data</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2">
                                        {horarios.map((h: any) => {
                                            const busy = ocupados.includes(h);
                                            const sel = selectedHora === h;
                                            return (
                                                <button
                                                    key={h}
                                                    disabled={busy}
                                                    onClick={() => setSelectedHora(h)}
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
                                )}
                                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-md bg-gradient-to-br from-pink-500 to-violet-600 inline-block" />
                                        <span className="text-xs text-gray-400">Seleccionado</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-md bg-gray-100 inline-block" />
                                        <span className="text-xs text-gray-400">Disponível</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 rounded-md bg-gray-50 border border-gray-200 inline-block" />
                                        <span className="text-xs text-gray-400">Ocupado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4 — Confirmar */}
                    {step === 4 && (
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
                                <h2 className="font-black text-gray-900 text-lg mb-5">Resumo da consulta</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                                        <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
                                            <Heart size={18} className="text-pink-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Tipo de consulta</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">
                                                {tiposConsulta.find(t => t.id === tipo)?.label}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl">
                                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                                            <Stethoscope size={18} className="text-violet-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Profissional</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">
                                                {profissionais.find(p => p.id === profissional)?.nome}
                                            </p>
                                            <p className="text-xs text-gray-400">{profissionais.find(p => p.id === profissional)?.especialidade}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
                                        <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                                            <Calendar size={18} className="text-sky-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Data e hora</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">
                                                {selectedDate} de {MONTHS[calMonth]} de {calYear}
                                            </p>
                                            <p className="text-xs text-gray-400">às {selectedHora}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin size={18} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Local</p>
                                            <p className="font-black text-gray-900 text-sm mt-0.5">Hospital Central de Maputo</p>
                                            <p className="text-xs text-gray-400">Av. Eduardo Mondlane, Maputo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex-1">
                                    <h3 className="font-black text-gray-900 mb-1">Notas adicionais</h3>
                                    <p className="text-xs text-gray-400 mb-4">Informe o médico sobre algo importante antes da consulta (opcional)</p>
                                    <textarea
                                        value={notas}
                                        onChange={(e) => setNotas(e.target.value)}
                                        placeholder="Ex: Tenho sentido enjoos frequentes, dor nas costas..."
                                        rows={5}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 resize-none transition-colors"
                                    />
                                </div>
                                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                                    <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-700 leading-relaxed font-medium">
                                        Receberá uma confirmação por SMS após o agendamento. Em caso de urgência, dirija-se à urgência mais próxima.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => step > 1 && setStep(step - 1)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${step === 1
                                ? "invisible"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600"
                                }`}
                        >
                            <ChevronLeft size={16} />
                            Anterior
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={() => canNext() && setStep(step + 1)}
                                disabled={!canNext()}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200"
                            >
                                Continuar
                                <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={() => setConfirmed(true)}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200"
                            >
                                <CheckCircle size={16} />
                                Confirmar Agendamento
                            </button>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}