// "use client";

// import { useState } from "react";
// import {
//     Calendar, Clock, ChevronLeft, ChevronRight, MapPin,
//     Stethoscope, CheckCircle, Baby, Heart, Star, ArrowRight, AlertCircle
// } from "lucide-react";

// const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
// const MONTHS = [
//     "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//     "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
// ];

// const tiposConsulta = [
//     { id: "rotina", label: "Consulta de Rotina", desc: "Acompanhamento regular da gravidez", icon: Heart, color: "pink" },
//     { id: "ecografia", label: "Ecografia", desc: "Exame de ultrassom ao bebé", icon: Baby, color: "violet" },
//     { id: "laboratorio", label: "Análises", desc: "Exames laboratoriais", icon: AlertCircle, color: "sky" },
//     { id: "especialista", label: "Especialista", desc: "Consulta com médico especialista", icon: Stethoscope, color: "emerald" },
// ];

// const profissionais = [
//     { id: 1, nome: "Dra. Ana Machava", especialidade: "Obstetra", avaliacao: 4.9, avatar: "AM", disponivel: true },
//     { id: 2, nome: "Dr. Carlos Sitoe", especialidade: "Ginecologista", avaliacao: 4.8, avatar: "CS", disponivel: true },
//     { id: 3, nome: "Dra. Lúcia Bila", especialidade: "Enfermeira-Chefe", avaliacao: 4.7, avatar: "LB", disponivel: false },
// ];

// const horarios = [
//     "07:30", "08:00", "08:30", "09:00", "09:30", "10:00",
//     "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"
// ];
// const ocupados = ["08:30", "10:00", "14:30"];

// function getDaysInMonth(year, month) {
//     return new Date(year, month + 1, 0).getDate();
// }
// function getFirstDayOfMonth(year, month) {
//     return new Date(year, month, 1).getDay();
// }

// export default function NewAppointment(user: any) {
//     const today = new Date();
//     const [step, setStep] = useState(1);
//     const [tipo, setTipo] = useState(null);
//     const [profissional, setProfissional] = useState(null);
//     const [calMonth, setCalMonth] = useState(today.getMonth());
//     const [calYear, setCalYear] = useState(today.getFullYear());
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedHora, setSelectedHora] = useState(null);
//     const [notas, setNotas] = useState("");
//     const [confirmed, setConfirmed] = useState(false);

//     const daysInMonth = getDaysInMonth(calYear, calMonth);
//     const firstDay = getFirstDayOfMonth(calYear, calMonth);

//     const prevMonth = () => {
//         if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
//         else setCalMonth(calMonth - 1);
//     };
//     const nextMonth = () => {
//         if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
//         else setCalMonth(calMonth + 1);
//     };

//     const isPast = (day) => {
//         const d = new Date(calYear, calMonth, day);
//         const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//         return d < t;
//     };

//     const canNext = () => {
//         if (step === 1) return !!tipo;
//         if (step === 2) return !!profissional;
//         if (step === 3) return !!selectedDate && !!selectedHora;
//         return true;
//     };

//     const tipoColorMap = {
//         pink: { bg: "bg-pink-50", border: "border-pink-200", selBorder: "border-pink-500", selBg: "bg-pink-50", icon: "text-pink-500", iconBg: "bg-pink-100" },
//         violet: { bg: "bg-violet-50", border: "border-violet-200", selBorder: "border-violet-500", selBg: "bg-violet-50", icon: "text-violet-500", iconBg: "bg-violet-100" },
//         sky: { bg: "bg-sky-50", border: "border-sky-200", selBorder: "border-sky-500", selBg: "bg-sky-50", icon: "text-sky-500", iconBg: "bg-sky-100" },
//         emerald: { bg: "bg-emerald-50", border: "border-emerald-200", selBorder: "border-emerald-500", selBg: "bg-emerald-50", icon: "text-emerald-500", iconBg: "bg-emerald-100" },
//     };

//     if (confirmed) {
//         return (
//             <div className="min-h-screen bg-rose-50/40 flex items-center justify-center p-8">
//                 <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-12 max-w-md w-full text-center">
//                     <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                         <CheckCircle size={38} className="text-white" />
//                     </div>
//                     <h2 className="text-2xl font-black text-gray-900 mb-2">Consulta Agendada!</h2>
//                     <p className="text-gray-400 text-sm mb-8">Receberá uma confirmação por SMS em breve.</p>

//                     <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 text-left mb-8 space-y-3">
//                         <div className="flex items-center gap-3">
//                             <Calendar size={15} className="text-pink-500 shrink-0" />
//                             <span className="text-sm font-semibold text-gray-700">
//                                 {selectedDate && `${selectedDate} de ${MONTHS[calMonth]} de ${calYear}`}
//                             </span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <Clock size={15} className="text-pink-500 shrink-0" />
//                             <span className="text-sm font-semibold text-gray-700">{selectedHora}</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <Stethoscope size={15} className="text-pink-500 shrink-0" />
//                             <span className="text-sm font-semibold text-gray-700">
//                                 {profissionais.find(p => p.id === profissional)?.nome}
//                             </span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <Heart size={15} className="text-pink-500 shrink-0" />
//                             <span className="text-sm font-semibold text-gray-700">
//                                 {tiposConsulta.find(t => t.id === tipo)?.label}
//                             </span>
//                         </div>
//                     </div>

//                     <button
//                         onClick={() => { setConfirmed(false); setStep(1); setTipo(null); setProfissional(null); setSelectedDate(null); setSelectedHora(null); setNotas(""); }}
//                         className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity"
//                     >
//                         Agendar outra consulta
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-rose-50/40 p-2">

//             {/* Page header */}
//             <div className="mb-8">
//                 <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Gestão de Saúde</p>
//                 <h1 className="text-2xl font-black text-gray-900">Agendar Consulta</h1>
//                 <p className="text-sm text-gray-400 mt-1">Marque a sua próxima consulta pré-natal</p>
//             </div>

//             {/* Steps indicator */}
//             <div className="flex items-center gap-0 mb-10 max-w-xl">
//                 {[
//                     { n: 1, label: "Tipo" },
//                     { n: 2, label: "Profissional" },
//                     { n: 3, label: "Data & Hora" },
//                     { n: 4, label: "Confirmar" },
//                 ].map((s, i) => (
//                     <div key={s.n} className="flex items-center flex-1 last:flex-none">
//                         <div className="flex flex-col items-center gap-1.5">
//                             <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all ${step > s.n
//                                 ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white"
//                                 : step === s.n
//                                     ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-200"
//                                     : "bg-white border-2 border-gray-200 text-gray-300"
//                                 }`}>
//                                 {step > s.n ? <CheckCircle size={16} /> : s.n}
//                             </div>
//                             <span className={`text-xs font-bold whitespace-nowrap ${step >= s.n ? "text-gray-700" : "text-gray-300"}`}>
//                                 {s.label}
//                             </span>
//                         </div>
//                         {i < 3 && (
//                             <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all ${step > s.n ? "bg-gradient-to-r from-pink-400 to-violet-500" : "bg-gray-200"}`} />
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* Step content */}
//             <div className="max-w-4xl">

//                 {/* Step 1 — Tipo de consulta */}
//                 {step === 1 && (
//                     <div>
//                         <h2 className="text-lg font-black text-gray-900 mb-1">Que tipo de consulta precisa?</h2>
//                         <p className="text-sm text-gray-400 mb-6">Seleccione o tipo de consulta que deseja agendar</p>

//                         <div className="grid grid-cols-2 gap-4 mb-8">
//                             {tiposConsulta.map((t) => {
//                                 const cfg = tipoColorMap[t.color];
//                                 const Icon = t.icon;
//                                 const sel = tipo === t.id;
//                                 return (
//                                     <button
//                                         key={t.id}
//                                         onClick={() => setTipo(t.id)}
//                                         className={`text-left p-5 rounded-2xl border-2 transition-all ${sel
//                                             ? `${cfg.selBg} ${cfg.selBorder} shadow-sm`
//                                             : "bg-white border-gray-100 hover:border-gray-200"
//                                             }`}
//                                     >
//                                         <div className="flex items-start gap-4">
//                                             <div className={`w-11 h-11 ${cfg.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
//                                                 <Icon size={20} className={cfg.icon} />
//                                             </div>
//                                             <div className="flex-1">
//                                                 <p className="font-black text-gray-900 text-sm mb-0.5">{t.label}</p>
//                                                 <p className="text-xs text-gray-400 leading-snug">{t.desc}</p>
//                                             </div>
//                                             {sel && (
//                                                 <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
//                                                     <CheckCircle size={12} className="text-white" />
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}

//                 {/* Step 2 — Profissional */}
//                 {step === 2 && (
//                     <div>
//                         <h2 className="text-lg font-black text-gray-900 mb-1">Escolha o profissional</h2>
//                         <p className="text-sm text-gray-400 mb-6">Seleccione o médico ou enfermeira da sua preferência</p>

//                         <div className="flex flex-col gap-3 mb-8">
//                             {profissionais.map((p) => {
//                                 const sel = profissional === p.id;
//                                 return (
//                                     <button
//                                         key={p.id}
//                                         onClick={() => p.disponivel && setProfissional(p.id)}
//                                         disabled={!p.disponivel}
//                                         className={`text-left p-5 rounded-2xl border-2 transition-all ${!p.disponivel
//                                             ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed"
//                                             : sel
//                                                 ? "bg-pink-50 border-pink-400 shadow-sm"
//                                                 : "bg-white border-gray-100 hover:border-pink-200"
//                                             }`}
//                                     >
//                                         <div className="flex items-center gap-4">
//                                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white" : "bg-gradient-to-br from-pink-100 to-violet-100 text-violet-700"
//                                                 }`}>
//                                                 {p.avatar}
//                                             </div>
//                                             <div className="flex-1">
//                                                 <p className="font-black text-gray-900 text-sm">{p.nome}</p>
//                                                 <p className="text-xs text-gray-400 mt-0.5">{p.especialidade}</p>
//                                                 <div className="flex items-center gap-1 mt-1.5">
//                                                     <Star size={11} className="text-amber-400 fill-amber-400" />
//                                                     <span className="text-xs font-bold text-gray-600">{p.avaliacao}</span>
//                                                 </div>
//                                             </div>
//                                             {p.disponivel ? (
//                                                 <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
//                                                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
//                                                     Disponível
//                                                 </span>
//                                             ) : (
//                                                 <span className="bg-gray-100 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
//                                                     Indisponível
//                                                 </span>
//                                             )}
//                                             {sel && (
//                                                 <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0">
//                                                     <CheckCircle size={14} className="text-white" />
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}

//                 {/* Step 3 — Data & Hora */}
//                 {step === 3 && (
//                     <div className="grid grid-cols-2 gap-6 mb-8">

//                         {/* Calendar */}
//                         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//                             <div className="flex items-center justify-between mb-5">
//                                 <h3 className="font-black text-gray-900">{MONTHS[calMonth]} {calYear}</h3>
//                                 <div className="flex items-center gap-1">
//                                     <button onClick={prevMonth} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors">
//                                         <ChevronLeft size={16} className="text-gray-500" />
//                                     </button>
//                                     <button onClick={nextMonth} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-colors">
//                                         <ChevronRight size={16} className="text-gray-500" />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Day labels */}
//                             <div className="grid grid-cols-7 mb-2">
//                                 {DAYS.map((d) => (
//                                     <div key={d} className="text-center text-xs font-bold text-gray-300 py-1">{d}</div>
//                                 ))}
//                             </div>

//                             {/* Day cells */}
//                             <div className="grid grid-cols-7 gap-y-1">
//                                 {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
//                                 {Array.from({ length: daysInMonth }).map((_, i) => {
//                                     const day = i + 1;
//                                     const past = isPast(day);
//                                     const isSunday = new Date(calYear, calMonth, day).getDay() === 0;
//                                     const sel = selectedDate === day;
//                                     const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
//                                     const disabled = past || isSunday;
//                                     return (
//                                         <button
//                                             key={day}
//                                             disabled={disabled}
//                                             onClick={() => { setSelectedDate(day); setSelectedHora(null); }}
//                                             className={`h-9 w-9 mx-auto rounded-xl text-sm font-bold transition-all ${disabled
//                                                 ? "text-gray-200 cursor-not-allowed"
//                                                 : sel
//                                                     ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
//                                                     : isToday
//                                                         ? "bg-pink-50 text-pink-600 border border-pink-200"
//                                                         : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
//                                                 }`}
//                                         >
//                                             {day}
//                                         </button>
//                                     );
//                                 })}
//                             </div>

//                             {selectedDate && (
//                                 <p className="text-xs text-center text-pink-500 font-semibold mt-4">
//                                     {selectedDate} de {MONTHS[calMonth]} de {calYear} seleccionado
//                                 </p>
//                             )}
//                         </div>

//                         {/* Horários */}
//                         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//                             <h3 className="font-black text-gray-900 mb-1">Horários disponíveis</h3>
//                             <p className="text-xs text-gray-400 mb-5">
//                                 {selectedDate ? `${selectedDate} de ${MONTHS[calMonth]}` : "Seleccione uma data primeiro"}
//                             </p>

//                             {!selectedDate ? (
//                                 <div className="flex flex-col items-center justify-center h-48 text-gray-200">
//                                     <Calendar size={40} />
//                                     <p className="text-sm mt-3 text-gray-300 font-medium">Escolha uma data</p>
//                                 </div>
//                             ) : (
//                                 <div className="grid grid-cols-3 gap-2">
//                                     {horarios.map((h) => {
//                                         const busy = ocupados.includes(h);
//                                         const sel = selectedHora === h;
//                                         return (
//                                             <button
//                                                 key={h}
//                                                 disabled={busy}
//                                                 onClick={() => setSelectedHora(h)}
//                                                 className={`py-2.5 rounded-xl text-sm font-bold transition-all ${busy
//                                                     ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
//                                                     : sel
//                                                         ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
//                                                         : "bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-transparent hover:border-pink-200"
//                                                     }`}
//                                             >
//                                                 {h}
//                                             </button>
//                                         );
//                                     })}
//                                 </div>
//                             )}

//                             <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-50">
//                                 <div className="flex items-center gap-1.5">
//                                     <span className="w-3 h-3 rounded-md bg-gradient-to-br from-pink-500 to-violet-600 inline-block" />
//                                     <span className="text-xs text-gray-400">Seleccionado</span>
//                                 </div>
//                                 <div className="flex items-center gap-1.5">
//                                     <span className="w-3 h-3 rounded-md bg-gray-100 inline-block" />
//                                     <span className="text-xs text-gray-400">Disponível</span>
//                                 </div>
//                                 <div className="flex items-center gap-1.5">
//                                     <span className="w-3 h-3 rounded-md bg-gray-50 border border-gray-200 inline-block" />
//                                     <span className="text-xs text-gray-400">Ocupado</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Step 4 — Confirmar */}
//                 {step === 4 && (
//                     <div className="grid grid-cols-2 gap-6 mb-8">

//                         {/* Summary */}
//                         <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
//                             <h2 className="font-black text-gray-900 text-lg mb-5">Resumo da consulta</h2>

//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
//                                     <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
//                                         <Heart size={18} className="text-pink-500" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs text-gray-400 font-medium">Tipo de consulta</p>
//                                         <p className="font-black text-gray-900 text-sm mt-0.5">
//                                             {tiposConsulta.find(t => t.id === tipo)?.label}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl">
//                                     <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
//                                         <Stethoscope size={18} className="text-violet-500" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs text-gray-400 font-medium">Profissional</p>
//                                         <p className="font-black text-gray-900 text-sm mt-0.5">
//                                             {profissionais.find(p => p.id === profissional)?.nome}
//                                         </p>
//                                         <p className="text-xs text-gray-400">{profissionais.find(p => p.id === profissional)?.especialidade}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
//                                     <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
//                                         <Calendar size={18} className="text-sky-500" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs text-gray-400 font-medium">Data e hora</p>
//                                         <p className="font-black text-gray-900 text-sm mt-0.5">
//                                             {selectedDate} de {MONTHS[calMonth]} de {calYear}
//                                         </p>
//                                         <p className="text-xs text-gray-400">às {selectedHora}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
//                                     <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
//                                         <MapPin size={18} className="text-gray-400" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs text-gray-400 font-medium">Local</p>
//                                         <p className="font-black text-gray-900 text-sm mt-0.5">Hospital Central de Maputo</p>
//                                         <p className="text-xs text-gray-400">Av. Eduardo Mondlane, Maputo</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Notes + CTA */}
//                         <div className="flex flex-col gap-4">
//                             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex-1">
//                                 <h3 className="font-black text-gray-900 mb-1">Notas adicionais</h3>
//                                 <p className="text-xs text-gray-400 mb-4">Informe o médico sobre algo importante antes da consulta (opcional)</p>
//                                 <textarea
//                                     value={notas}
//                                     onChange={(e) => setNotas(e.target.value)}
//                                     placeholder="Ex: Tenho sentido enjoos frequentes, dor nas costas..."
//                                     rows={5}
//                                     className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 resize-none transition-colors"
//                                 />
//                             </div>

//                             <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
//                                 <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
//                                 <p className="text-xs text-amber-700 leading-relaxed font-medium">
//                                     Receberá uma confirmação por SMS após o agendamento. Em caso de urgência, dirija-se à urgência mais próxima.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Navigation buttons */}
//                 <div className="flex items-center justify-between max-w-4xl">
//                     <button
//                         onClick={() => step > 1 && setStep(step - 1)}
//                         className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${step === 1
//                             ? "invisible"
//                             : "bg-white border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600"
//                             }`}
//                     >
//                         <ChevronLeft size={16} />
//                         Anterior
//                     </button>

//                     {step < 4 ? (
//                         <button
//                             onClick={() => canNext() && setStep(step + 1)}
//                             disabled={!canNext()}
//                             className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200"
//                         >
//                             Continuar
//                             <ArrowRight size={16} />
//                         </button>
//                     ) : (
//                         <button
//                             onClick={() => setConfirmed(true)}
//                             className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200"
//                         >
//                             <CheckCircle size={16} />
//                             Confirmar Agendamento
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";

import { useState } from "react";
import {
    Calendar, Clock, ChevronLeft, ChevronRight, MapPin,
    Stethoscope, CheckCircle, Baby, Heart, Star, ArrowRight,
    AlertCircle, Plus, Search, Filter, X, ChevronDown,
    FileText, Eye, RotateCcw
} from "lucide-react";

// ─── Mock data ───────────────────────────────────────────────
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const consultasHistorico = [
    { id: 1, tipo: "Rotina", data: "10 Jan 2026", hora: "09:00", profissional: "Dra. Ana Machava", especialidade: "Obstetra", local: "HCM", status: "realizada", semanas: 24, notas: "Tudo dentro da normalidade. Peso adequado." },
    { id: 2, tipo: "Ecografia", data: "28 Jan 2026", hora: "10:30", profissional: "Dr. Carlos Sitoe", especialidade: "Ginecologista", local: "HCM", status: "realizada", semanas: 27, notas: "Bebé com desenvolvimento normal. Sexo confirmado." },
    { id: 3, tipo: "Análises", data: "05 Fev 2026", hora: "07:30", profissional: "Dra. Lúcia Bila", especialidade: "Enf. Chefe", local: "CS Matola", status: "realizada", semanas: 29, notas: "Hemoglobina ligeiramente baixa. Suplemento prescrito." },
    { id: 4, tipo: "Rotina", data: "19 Fev 2026", hora: "08:00", profissional: "Dra. Ana Machava", especialidade: "Obstetra", local: "HCM", status: "realizada", semanas: 31, notas: "PA estável. Movimentos fetais normais." },
    { id: 5, tipo: "Especialista", data: "05 Mar 2026", hora: "14:00", profissional: "Dr. Carlos Sitoe", especialidade: "Ginecologista", local: "HCM", status: "agendada", semanas: 33, notas: "" },
    { id: 6, tipo: "Rotina", data: "20 Mar 2026", hora: "09:30", profissional: "Dra. Ana Machava", especialidade: "Obstetra", local: "HCM", status: "agendada", semanas: 35, notas: "" },
    { id: 7, tipo: "Ecografia", data: "02 Abr 2026", hora: "11:00", profissional: "Dr. Carlos Sitoe", especialidade: "Ginecologista", local: "HCM", status: "agendada", semanas: 37, notas: "" },
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
    { id: 3, nome: "Dra. Lúcia Bila", especialidade: "Enf. Chefe", avaliacao: 4.7, avatar: "LB", disponivel: false },
];

const horarios = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"];
const ocupados = ["08:30", "10:00", "14:30"];

// ─── Helpers ──────────────────────────────────────────────────
function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }

function StatusBadge({ status }) {
    if (status === "realizada") return (
        <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <CheckCircle size={11} /> Realizada
        </span>
    );
    if (status === "agendada") return (
        <span className="flex items-center gap-1.5 bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">
            <Clock size={11} /> Agendada
        </span>
    );
    return (
        <span className="flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <X size={11} /> Cancelada
        </span>
    );
}

function TipoBadge({ tipo }) {
    const map = {
        "Rotina": "bg-pink-50 text-pink-600",
        "Ecografia": "bg-violet-50 text-violet-600",
        "Análises": "bg-sky-50 text-sky-600",
        "Especialista": "bg-emerald-50 text-emerald-600",
    };
    return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${map[tipo] ?? "bg-gray-100 text-gray-500"}`}>{tipo}</span>;
}

const tipoColorMap = {
    pink: { selBorder: "border-pink-500", selBg: "bg-pink-50", icon: "text-pink-500", iconBg: "bg-pink-100" },
    violet: { selBorder: "border-violet-500", selBg: "bg-violet-50", icon: "text-violet-500", iconBg: "bg-violet-100" },
    sky: { selBorder: "border-sky-500", selBg: "bg-sky-50", icon: "text-sky-500", iconBg: "bg-sky-100" },
    emerald: { selBorder: "border-emerald-500", selBg: "bg-emerald-50", icon: "text-emerald-500", iconBg: "bg-emerald-100" },
};

// ─── Scheduling wizard (inline) ───────────────────────────────
function AgendarWizard({ onClose, onSuccess }) {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [tipo, setTipo] = useState(null);
    const [profissional, setProfissional] = useState(null);
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHora, setSelectedHora] = useState(null);
    const [notas, setNotas] = useState("");

    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDay(calYear, calMonth);

    const isPast = (day) => {
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
    const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
    const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

    const steps = [
        { n: 1, label: "Tipo" },
        { n: 2, label: "Profissional" },
        { n: 3, label: "Data & Hora" },
        { n: 4, label: "Confirmar" },
    ];

    return (
        <div className="flex flex-col h-full">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                <div>
                    <h2 className="font-black text-gray-900 text-lg leading-none">Agendar Consulta</h2>
                    <p className="text-xs text-gray-400 mt-1">Passo {step} de 4</p>
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
                            {i < 3 && <div className={`flex-1 h-0.5 mx-1.5 mb-4 rounded-full ${step > s.n ? "bg-gradient-to-r from-pink-400 to-violet-500" : "bg-gray-100"}`} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step content — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5">

                {/* Step 1 */}
                {step === 1 && (
                    <div className="space-y-3">
                        <p className="font-black text-gray-900 mb-1">Que tipo de consulta?</p>
                        {tiposConsulta.map((t) => {
                            const cfg = tipoColorMap[t.color];
                            const Icon = t.icon;
                            const sel = tipo === t.id;
                            return (
                                <button key={t.id} onClick={() => setTipo(t.id)}
                                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${sel ? `${cfg.selBg} ${cfg.selBorder}` : "bg-white border-gray-100 hover:border-gray-200"}`}>
                                    <div className={`w-10 h-10 ${cfg.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                                        <Icon size={18} className={cfg.icon} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-gray-900 text-sm">{t.label}</p>
                                        <p className="text-xs text-gray-400">{t.desc}</p>
                                    </div>
                                    {sel && <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0"><CheckCircle size={11} className="text-white" /></div>}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <div className="space-y-3">
                        <p className="font-black text-gray-900 mb-1">Escolha o profissional</p>
                        {profissionais.map((p) => {
                            const sel = profissional === p.id;
                            return (
                                <button key={p.id} onClick={() => p.disponivel && setProfissional(p.id)} disabled={!p.disponivel}
                                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${!p.disponivel ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed"
                                            : sel ? "bg-pink-50 border-pink-400"
                                                : "bg-white border-gray-100 hover:border-pink-200"
                                        }`}>
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white" : "bg-gradient-to-br from-pink-100 to-violet-100 text-violet-700"}`}>
                                        {p.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-gray-900 text-sm">{p.nome}</p>
                                        <p className="text-xs text-gray-400">{p.especialidade}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star size={10} className="text-amber-400 fill-amber-400" />
                                            <span className="text-xs font-bold text-gray-500">{p.avaliacao}</span>
                                        </div>
                                    </div>
                                    {p.disponivel
                                        ? <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />Disponível</span>
                                        : <span className="bg-gray-100 text-gray-400 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">Indisponível</span>
                                    }
                                    {sel && <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shrink-0"><CheckCircle size={11} className="text-white" /></div>}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <div className="space-y-4">
                        {/* Mini calendar */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-black text-gray-900 text-sm">{MONTHS[calMonth]} {calYear}</span>
                                <div className="flex gap-1">
                                    <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center"><ChevronLeft size={14} className="text-gray-500" /></button>
                                    <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center"><ChevronRight size={14} className="text-gray-500" /></button>
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
                                    const sel = selectedDate === day;
                                    const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                                    const disabled = past || isSun;
                                    return (
                                        <button key={day} disabled={disabled} onClick={() => { setSelectedDate(day); setSelectedHora(null); }}
                                            className={`h-8 w-8 mx-auto rounded-lg text-xs font-bold transition-all ${disabled ? "text-gray-200 cursor-not-allowed"
                                                    : sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                        : isToday ? "bg-pink-50 text-pink-600 border border-pink-200"
                                                            : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                                }`}>{day}</button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Horários */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-4">
                            <p className="font-black text-gray-900 text-sm mb-3">
                                {selectedDate ? `Horários — ${selectedDate} de ${MONTHS[calMonth]}` : "Seleccione uma data"}
                            </p>
                            {!selectedDate ? (
                                <div className="flex flex-col items-center py-6 text-gray-200">
                                    <Calendar size={28} />
                                    <p className="text-xs mt-2 text-gray-300">Escolha uma data primeiro</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-2">
                                    {horarios.map((h) => {
                                        const busy = ocupados.includes(h);
                                        const sel = selectedHora === h;
                                        return (
                                            <button key={h} disabled={busy} onClick={() => setSelectedHora(h)}
                                                className={`py-2 rounded-xl text-xs font-bold transition-all ${busy ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                                                        : sel ? "bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                                            : "bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                                                    }`}>{h}</button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 4 */}
                {step === 4 && (
                    <div className="space-y-3">
                        <p className="font-black text-gray-900 mb-1">Confirme os dados</p>

                        {[
                            { icon: Heart, bg: "bg-pink-50", iconCl: "text-pink-500", label: "Tipo", value: tiposConsulta.find(t => t.id === tipo)?.label },
                            { icon: Stethoscope, bg: "bg-violet-50", iconCl: "text-violet-500", label: "Profissional", value: profissionais.find(p => p.id === profissional)?.nome, sub: profissionais.find(p => p.id === profissional)?.especialidade },
                            { icon: Calendar, bg: "bg-sky-50", iconCl: "text-sky-500", label: "Data", value: `${selectedDate} de ${MONTHS[calMonth]} de ${calYear}`, sub: `às ${selectedHora}` },
                            { icon: MapPin, bg: "bg-gray-50", iconCl: "text-gray-400", label: "Local", value: "Hospital Central de Maputo", sub: "Av. Eduardo Mondlane" },
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
                            <p className="text-xs font-bold text-gray-500 mb-2">Notas adicionais (opcional)</p>
                            <textarea value={notas} onChange={e => setNotas(e.target.value)} placeholder="Ex: Tenho sentido enjoos frequentes..."
                                rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 resize-none transition-colors" />
                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                            <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700 leading-relaxed font-medium">Receberá uma confirmação por SMS após o agendamento.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer nav */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
                <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-600 hover:border-pink-200 hover:text-pink-600 transition-all">
                    <ChevronLeft size={15} /> {step === 1 ? "Cancelar" : "Anterior"}
                </button>

                {step < 4 ? (
                    <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200 text-sm">
                        Continuar <ArrowRight size={15} />
                    </button>
                ) : (
                    <button onClick={() => onSuccess({ tipo, profissional, selectedDate, selectedHora, calMonth, calYear })}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200 text-sm">
                        <CheckCircle size={15} /> Confirmar
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Main page ────────────────────────────────────────────────
export default function ConsultasPage() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState("todas");
    const [search, setSearch] = useState("");
    const [successData, setSuccessData] = useState(null);
    const [expanded, setExpanded] = useState(null);

    const filtered = consultasHistorico.filter(c => {
        const matchStatus = filterStatus === "todas" || c.status === filterStatus;
        const matchSearch = c.profissional.toLowerCase().includes(search.toLowerCase()) ||
            c.tipo.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    const proxima = consultasHistorico.find(c => c.status === "agendada");

    const handleSuccess = (data) => {
        setSuccessData(data);
        setDrawerOpen(false);
    };

    return (
        <div className="min-h-screen bg-rose-50/40">

            {/* ── Backdrop ── */}
            {drawerOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all"
                    onClick={() => setDrawerOpen(false)} />
            )}

            {/* ── Drawer ── */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                {drawerOpen && (
                    <AgendarWizard
                        onClose={() => setDrawerOpen(false)}
                        onSuccess={handleSuccess}
                    />
                )}
            </div>

            {/* ── Page content ── */}
            <div className="p-8">

                {/* Success toast */}
                {successData && (
                    <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                            <CheckCircle size={18} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-black text-emerald-800 text-sm">Consulta agendada com sucesso!</p>
                            <p className="text-xs text-emerald-600 mt-0.5">
                                {tiposConsulta.find(t => t.id === successData.tipo)?.label} · {selectedDateStr(successData)} · {successData.selectedHora}
                            </p>
                        </div>
                        <button onClick={() => setSuccessData(null)} className="text-emerald-400 hover:text-emerald-600"><X size={16} /></button>
                    </div>
                )}

                {/* Page header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Saúde Pré-natal</p>
                        <h1 className="text-2xl font-black text-gray-900">As minhas consultas</h1>
                        <p className="text-sm text-gray-400 mt-1">Histórico e consultas agendadas</p>
                    </div>
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-200 text-sm"
                    >
                        <Plus size={17} />
                        Agendar consulta
                    </button>
                </div>

                {/* Próxima consulta banner */}
                {proxima && (
                    <div className="bg-gradient-to-r from-pink-500 to-violet-600 rounded-2xl p-5 mb-6 text-white relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                        <div className="absolute -bottom-6 right-16 w-20 h-20 bg-white/5 rounded-full" />
                        <div className="relative flex items-center gap-5">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 shrink-0">
                                <Calendar size={26} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Próxima consulta</p>
                                <p className="font-black text-lg leading-none">{proxima.tipo}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="flex items-center gap-1.5 text-white/80 text-sm font-medium">
                                        <Calendar size={13} /> {proxima.data}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-white/80 text-sm font-medium">
                                        <Clock size={13} /> {proxima.hora}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-white/80 text-sm font-medium">
                                        <Stethoscope size={13} /> {proxima.profissional}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white/20 border border-white/30 rounded-xl px-3 py-1.5 text-xs font-bold text-white shrink-0">
                                {proxima.semanas} sem.
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: "Total", value: consultasHistorico.length, color: "text-gray-900", bg: "bg-white" },
                        { label: "Realizadas", value: consultasHistorico.filter(c => c.status === "realizada").length, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Agendadas", value: consultasHistorico.filter(c => c.status === "agendada").length, color: "text-violet-600", bg: "bg-violet-50" },
                    ].map(({ label, value, color, bg }) => (
                        <div key={label} className={`${bg} border border-gray-100 rounded-2xl p-4 text-center`}>
                            <p className={`text-3xl font-black ${color}`}>{value}</p>
                            <p className="text-xs font-semibold text-gray-400 mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters + Search */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="relative flex-1 max-w-xs">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar consulta..."
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 transition-colors" />
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        {["todas", "realizada", "agendada"].map(f => (
                            <button key={f} onClick={() => setFilterStatus(f)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${filterStatus === f
                                        ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-pink-100"
                                        : "bg-white border border-gray-100 text-gray-500 hover:border-pink-200 hover:text-pink-600"
                                    }`}>
                                {f === "todas" ? "Todas" : f === "realizada" ? "Realizadas" : "Agendadas"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Consultas list */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-200">
                            <Calendar size={40} />
                            <p className="text-sm mt-3 text-gray-300 font-medium">Nenhuma consulta encontrada</p>
                        </div>
                    ) : (
                        filtered.map((c, i) => (
                            <div key={c.id}>
                                <div
                                    className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50/60 transition-colors ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}
                                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                                >
                                    {/* Date block */}
                                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-pink-100">
                                        <span className="text-xs font-bold text-pink-400 leading-none">{c.data.split(" ")[1]}</span>
                                        <span className="text-lg font-black text-pink-600 leading-none">{c.data.split(" ")[0]}</span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <p className="font-black text-gray-900 text-sm">{c.tipo}</p>
                                            <TipoBadge tipo={c.tipo} />
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <Clock size={11} /> {c.hora}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <Stethoscope size={11} /> {c.profissional}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                <MapPin size={11} /> {c.local}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Semanas + status */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full border border-gray-100">
                                            {c.semanas} sem.
                                        </span>
                                        <StatusBadge status={c.status} />
                                        <ChevronDown size={15} className={`text-gray-300 transition-transform ${expanded === c.id ? "rotate-180" : ""}`} />
                                    </div>
                                </div>

                                {/* Expanded details */}
                                {expanded === c.id && (
                                    <div className="px-6 pb-4 bg-gray-50/60 border-b border-gray-50">
                                        <div className="flex items-start gap-4 pt-3">
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Notas da consulta</p>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {c.notas || <span className="text-gray-300 italic">Sem notas registadas.</span>}
                                                </p>
                                            </div>
                                            {c.status === "realizada" && (
                                                <button className="flex items-center gap-1.5 text-xs font-bold text-pink-500 bg-pink-50 border border-pink-100 px-3 py-2 rounded-xl hover:bg-pink-100 transition-colors shrink-0">
                                                    <FileText size={13} /> Ver relatório
                                                </button>
                                            )}
                                            {c.status === "agendada" && (
                                                <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-1.5 text-xs font-bold text-violet-500 bg-violet-50 border border-violet-100 px-3 py-2 rounded-xl hover:bg-violet-100 transition-colors shrink-0">
                                                    <RotateCcw size={13} /> Reagendar
                                                </button>
                                            )}
                                        </div>
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

function selectedDateStr(data) {
    if (!data) return "";
    return `${data.selectedDate} de ${MONTHS[data.calMonth]} de ${data.calYear}`;
}