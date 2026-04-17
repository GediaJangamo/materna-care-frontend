"use client";

import { useState } from "react";
import {
    AlertTriangle, Calendar, Users, Clock, ChevronRight,
    Bell, Baby, FileText, Phone, Star
} from "lucide-react";

const mockConsultas = [
    { id: 1, nome: "Fátima Dlamini", semanas: 32, hora: "08:30", tipo: "Rotina", risco: "alto", avatar: "FD" },
    { id: 2, nome: "Amélia Sithole", semanas: 18, hora: "09:15", tipo: "Eco morfológica", risco: "normal", avatar: "AS" },
    { id: 3, nome: "Celeste Nhantumbo", semanas: 28, hora: "10:00", tipo: "Rotina", risco: "medio", avatar: "CN" },
    { id: 4, nome: "Lurdes Cossa", semanas: 8, hora: "11:30", tipo: "Primeira consulta", risco: "normal", avatar: "LC" },
    { id: 5, nome: "Esperança Bila", semanas: 36, hora: "14:00", tipo: "Pré-parto", risco: "alto", avatar: "EB" },
    { id: 6, nome: "Maria Mondlane", semanas: 22, hora: "15:30", tipo: "Rotina", risco: "normal", avatar: "MM" },
];

const mockAlertas = [
    { id: 1, nome: "Fátima Dlamini", msg: "Pressão arterial elevada (160/100)", tempo: "há 2h", urgencia: "critico" },
    { id: 2, nome: "Esperança Bila", msg: "Movimento fetal reduzido reportado", tempo: "há 4h", urgencia: "critico" },
    { id: 3, nome: "Celeste Nhantumbo", msg: "Consulta do 2º trimestre em atraso", tempo: "há 1 dia", urgencia: "atencao" },
    { id: 4, nome: "Paulina Tembe", msg: "Exames laboratoriais pendentes", tempo: "há 2 dias", urgencia: "atencao" },
    { id: 5, nome: "Rosa Cumbana", msg: "Próxima consulta não agendada", tempo: "há 3 dias", urgencia: "leve" },
];

const mockGestantesAltoRisco = [
    { id: 1, nome: "Fátima Dlamini", semanas: 32, condicao: "Pré-eclâmpsia", avatar: "FD", ultimaConsulta: "hoje" },
    { id: 2, nome: "Esperança Bila", semanas: 36, condicao: "Diabetes gestacional", avatar: "EB", ultimaConsulta: "ontem" },
    { id: 3, nome: "Guida Macuacua", semanas: 24, condicao: "Anemia severa", avatar: "GM", ultimaConsulta: "3 dias" },
    { id: 4, nome: "Teresa Uaene", semanas: 29, condicao: "Gravidez gemelar", avatar: "TU", ultimaConsulta: "5 dias" },
];

function RiscoBadge({ risco }: any) {
    if (risco === "alto") return (
        <span className="flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            Alto Risco
        </span>
    );
    if (risco === "medio") return (
        <span className="flex items-center gap-1.5 bg-amber-50 text-amber-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            Atenção
        </span>
    );
    return (
        <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Normal
        </span>
    );
}

function AlertaCard({ alerta }: any) {
    if (alerta.urgencia === "critico") return (
        <div className="bg-red-50 border border-red-100 border-l-4 border-l-red-500 rounded-xl p-3 mb-2">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{alerta.nome}</p>
                    <p className="text-xs text-red-700 mt-0.5 leading-snug">{alerta.msg}</p>
                </div>
                <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-gray-400 mt-2">{alerta.tempo}</p>
        </div>
    );
    if (alerta.urgencia === "atencao") return (
        <div className="bg-amber-50 border border-amber-100 border-l-4 border-l-amber-400 rounded-xl p-3 mb-2">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{alerta.nome}</p>
                    <p className="text-xs text-amber-700 mt-0.5 leading-snug">{alerta.msg}</p>
                </div>
                <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-gray-400 mt-2">{alerta.tempo}</p>
        </div>
    );
    return (
        <div className="bg-violet-50 border border-violet-100 border-l-4 border-l-violet-400 rounded-xl p-3 mb-2">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{alerta.nome}</p>
                    <p className="text-xs text-violet-700 mt-0.5 leading-snug">{alerta.msg}</p>
                </div>
                <AlertTriangle size={14} className="text-violet-400 shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-gray-400 mt-2">{alerta.tempo}</p>
        </div>
    );
}

export default function ProfessionalDashboard(user: any) {
    return (
        <div className="min-h-screen p-2">

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-7">
                <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-2xl p-5">
                    <div className="w-9 h-9 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
                        <Users size={18} className="text-pink-600" />
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">47</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">Gestantes acompanhadas</p>
                    <p className="text-xs font-semibold text-pink-500 mt-1">+3 este mês</p>
                </div>

                <div className="bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-2xl p-5">
                    <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                        <AlertTriangle size={18} className="text-red-500" />
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">3</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">Alertas críticos</p>
                    <p className="text-xs font-semibold text-red-500 mt-1">Requerem atenção</p>
                </div>

                <div className="bg-gradient-to-br from-white to-amber-50 border border-amber-100 rounded-2xl p-5">
                    <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                        <Clock size={18} className="text-amber-500" />
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">5</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">Acompanhamento pendente</p>
                    <p className="text-xs font-semibold text-amber-500 mt-1">Esta semana</p>
                </div>

                <div className="bg-gradient-to-br from-white to-violet-50 border border-violet-100 rounded-2xl p-5">
                    <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center mb-3">
                        <Calendar size={18} className="text-violet-600" />
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">8</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">Consultas hoje</p>
                    <p className="text-xs font-semibold text-violet-500 mt-1">3 realizadas · 5 a fazer</p>
                </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-3 gap-5">

                {/* Left — 2 cols */}
                <div className="col-span-2 flex flex-col gap-5">

                    {/* Consultas de hoje */}
                    <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-600 rounded-lg flex items-center justify-center">
                                    <Calendar size={14} className="text-white" />
                                </div>
                                <span className="font-black text-gray-900 text-base">Consultas de Hoje</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">8 total</span>
                                <button className="text-pink-500 text-xs font-bold hover:text-pink-700 transition-colors">Ver todas</button>
                            </div>
                        </div>

                        <div>
                            {mockConsultas.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex items-center gap-3.5 px-6 py-3.5 hover:bg-pink-50/50 transition-colors cursor-pointer border-b border-gray-50 last:border-none"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-violet-100 rounded-xl flex items-center justify-center text-pink-700 font-black text-xs shrink-0">
                                        {c.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 text-sm">{c.nome}</p>
                                        <p className="text-xs text-gray-400">{c.tipo} · {c.semanas} semanas</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-violet-600 text-sm font-bold">
                                        <Clock size={13} />
                                        {c.hora}
                                    </div>
                                    <RiscoBadge risco={c.risco} />
                                    <ChevronRight size={15} className="text-gray-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gestantes de alto risco */}
                    <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-red-50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                                    <Star size={14} className="text-white" />
                                </div>
                                <span className="font-black text-gray-900 text-base">Gestantes de Alto Risco</span>
                            </div>
                            <span className="bg-red-100 text-red-500 text-xs font-bold px-3 py-1 rounded-full">4 gestantes</span>
                        </div>

                        <div className="grid grid-cols-2">
                            {mockGestantesAltoRisco.map((g, i) => (
                                <div
                                    key={g.id}
                                    className="p-5 hover:bg-red-50/40 transition-colors cursor-pointer border-b border-r border-gray-50 last:border-none"
                                >
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center text-red-500 font-black text-xs">
                                            {g.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{g.nome}</p>
                                            <p className="text-xs text-gray-400">{g.semanas} semanas</p>
                                        </div>
                                    </div>
                                    <div className="bg-red-50 border border-red-100 rounded-lg px-2.5 py-1.5 text-xs text-red-500 font-semibold mb-2">
                                        ⚠ {g.condicao}
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Última consulta: <strong className="text-gray-600">{g.ultimaConsulta}</strong>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-5">

                    {/* Alertas */}
                    <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-pink-50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-amber-400 rounded-lg flex items-center justify-center">
                                    <Bell size={14} className="text-white" />
                                </div>
                                <span className="font-black text-gray-900 text-base">Alertas</span>
                            </div>
                            <span className="bg-red-100 text-red-500 text-xs font-bold px-3 py-1 rounded-full">2 críticos</span>
                        </div>

                        <div className="p-3">
                            {mockAlertas.map((a) => <AlertaCard key={a.id} alerta={a} />)}
                        </div>

                        <div className="px-3 pb-3">
                            <button className="w-full py-2.5 bg-pink-50 border border-pink-200 rounded-xl text-pink-600 text-sm font-bold hover:bg-pink-100 transition-colors">
                                Ver todos os alertas
                            </button>
                        </div>
                    </div>

                    {/* Resumo do mês */}
                    <div className="bg-gradient-to-br from-pink-600 to-violet-700 rounded-2xl p-5 text-white relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />
                        <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-white/5 rounded-full" />

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-4">
                                <Baby size={17} className="text-white/90" />
                                <span className="font-black text-base">Resumo do Mês</span>
                            </div>

                            <div className="border-b border-white/10 py-2.5 flex items-center justify-between">
                                <span className="text-sm text-white/75">Partos este mês</span>
                                <span className="font-black text-lg">6</span>
                            </div>
                            <div className="border-b border-white/10 py-2.5 flex items-center justify-between">
                                <span className="text-sm text-white/75">Novas gestantes</span>
                                <span className="font-black text-lg">3</span>
                            </div>
                            <div className="py-2.5 flex items-center justify-between">
                                <span className="text-sm text-white/75">Taxa de comparência</span>
                                <span className="font-black text-lg">87%</span>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs text-white/60 mb-2">Progresso de consultas</p>
                                <div className="bg-white/20 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-white h-full rounded-full w-2/3" />
                                </div>
                                <p className="text-xs text-white/60 mt-1.5 text-right">68% concluídas</p>
                            </div>
                        </div>
                    </div>

                    {/* Acesso rápido */}
                    <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-sm">
                        <p className="font-black text-gray-900 text-base mb-3">Acesso Rápido</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="bg-pink-50 border border-pink-100 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-pink-400 hover:bg-pink-100 transition-all cursor-pointer">
                                <Baby size={17} className="text-pink-600" />
                                <span className="text-xs text-gray-600 font-semibold text-center">Nova gestante</span>
                            </button>
                            <button className="bg-violet-50 border border-violet-100 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-violet-400 hover:bg-violet-100 transition-all cursor-pointer">
                                <Calendar size={17} className="text-violet-600" />
                                <span className="text-xs text-gray-600 font-semibold text-center">Agendar consulta</span>
                            </button>
                            <button className="bg-sky-50 border border-sky-100 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-sky-400 hover:bg-sky-100 transition-all cursor-pointer">
                                <Phone size={17} className="text-sky-600" />
                                <span className="text-xs text-gray-600 font-semibold text-center">Contactar</span>
                            </button>
                            <button className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-emerald-400 hover:bg-emerald-100 transition-all cursor-pointer">
                                <FileText size={17} className="text-emerald-600" />
                                <span className="text-xs text-gray-600 font-semibold text-center">Relatório</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}