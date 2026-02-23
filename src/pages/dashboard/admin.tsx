"use client";

import {
    Users, Stethoscope, AlertTriangle, Calendar, Activity,
    TrendingUp, TrendingDown, ChevronRight, MoreHorizontal,
    Baby, MapPin, CheckCircle, Clock, BarChart2, PieChart,
} from "lucide-react";

const mockProfissionais = [
    { id: 1, nome: "Dr. Carlos Sitoe", especialidade: "Ginecologista", gestantes: 47, avatar: "CS", status: "ativo" },
    { id: 2, nome: "Dra. Ana Machava", especialidade: "Obstetra", gestantes: 38, avatar: "AM", status: "ativo" },
    { id: 3, nome: "Dra. Lúcia Bila", especialidade: "Enfermeira-Chefe", gestantes: 29, avatar: "LB", status: "ativo" },
    { id: 4, nome: "Dr. Pedro Nhantumbo", especialidade: "Clínico Geral", gestantes: 21, avatar: "PN", status: "inativo" },
];

const mockUnidades = [
    { id: 1, nome: "Hospital Central de Maputo", gestantes: 87, consultas: 34, risco: 12 },
    { id: 2, nome: "Centro de Saúde da Matola", gestantes: 54, consultas: 21, risco: 7 },
    { id: 3, nome: "Hospital Geral José Macamo", gestantes: 43, consultas: 18, risco: 5 },
    { id: 4, nome: "CS da Polana Caniço", gestantes: 31, consultas: 12, risco: 3 },
];

const mockAtividade = [
    { mes: "Out", consultas: 210 },
    { mes: "Nov", consultas: 245 },
    { mes: "Dez", consultas: 198 },
    { mes: "Jan", consultas: 267 },
    { mes: "Fev", consultas: 289 },
];

const maxBar = Math.max(...mockAtividade.map((m) => m.consultas));

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-slate-50 p-2">

            {/* KPI Cards — row 1 */}
            <div className="grid grid-cols-5 gap-4 mb-6">

                {/* Total gestantes */}
                <div className="col-span-1 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                            <Baby size={19} className="text-pink-600" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <TrendingUp size={11} /> +8%
                        </span>
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">215</p>
                    <p className="text-sm font-semibold text-gray-500 mt-1.5">Total de Gestantes</p>
                    <p className="text-xs text-gray-400 mt-1">Registadas no sistema</p>
                </div>

                {/* Total profissionais */}
                <div className="col-span-1 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                            <Stethoscope size={19} className="text-violet-600" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <TrendingUp size={11} /> +2
                        </span>
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">24</p>
                    <p className="text-sm font-semibold text-gray-500 mt-1.5">Profissionais</p>
                    <p className="text-xs text-gray-400 mt-1">Activos na plataforma</p>
                </div>

                {/* Alto risco */}
                <div className="col-span-1 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <AlertTriangle size={19} className="text-red-500" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                            <TrendingUp size={11} /> +3
                        </span>
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">27</p>
                    <p className="text-sm font-semibold text-gray-500 mt-1.5">Alto Risco</p>
                    <p className="text-xs text-gray-400 mt-1">Requerem monitorização</p>
                </div>

                {/* Consultas agendadas */}
                <div className="col-span-1 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                            <Calendar size={19} className="text-sky-600" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <TrendingUp size={11} /> +12%
                        </span>
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">148</p>
                    <p className="text-sm font-semibold text-gray-500 mt-1.5">Consultas Agendadas</p>
                    <p className="text-xs text-gray-400 mt-1">Próximos 30 dias</p>
                </div>

                {/* Atendimentos do mês */}
                <div className="col-span-1 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Activity size={19} className="text-amber-500" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <TrendingUp size={11} /> +8%
                        </span>
                    </div>
                    <p className="text-4xl font-black text-gray-900 leading-none">289</p>
                    <p className="text-sm font-semibold text-gray-500 mt-1.5">Atendimentos</p>
                    <p className="text-xs text-gray-400 mt-1">Realizados em Fevereiro</p>
                </div>
            </div>

            {/* Row 2 — Chart + Profissionais */}
            <div className="grid grid-cols-3 gap-5 mb-5">

                {/* Gráfico de atendimentos */}
                <div className="col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="font-black text-gray-900 text-base">Atendimentos por Mês</p>
                            <p className="text-xs text-gray-400 mt-0.5">Últimos 5 meses</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
                                <BarChart2 size={15} className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end gap-4 h-40">
                        {mockAtividade.map((m, i) => {
                            const height = Math.round((m.consultas / maxBar) * 100);
                            const isLast = i === mockAtividade.length - 1;
                            return (
                                <div key={m.mes} className="flex-1 flex flex-col items-center gap-2">
                                    <span className="text-xs font-bold text-gray-500">{m.consultas}</span>
                                    <div className="w-full rounded-xl overflow-hidden flex flex-col justify-end" style={{ height: "112px" }}>
                                        <div
                                            className={`w-full rounded-xl transition-all ${isLast ? "bg-gradient-to-t from-pink-600 to-violet-500" : "bg-gray-100"}`}
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400">{m.mes}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary pills */}
                    <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 inline-block" />
                            <span className="text-xs text-gray-500 font-medium">Mês actual</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-100 inline-block" />
                            <span className="text-xs text-gray-500 font-medium">Meses anteriores</span>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 text-emerald-500 text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full">
                            <TrendingUp size={12} />
                            Crescimento de 8% face ao mês anterior
                        </div>
                    </div>
                </div>

                {/* Distribuição risco */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <p className="font-black text-gray-900 text-base mb-1">Distribuição por Risco</p>
                    <p className="text-xs text-gray-400 mb-6">Total de 215 gestantes</p>

                    {/* Donut visual (CSS) */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                {/* Background */}
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                                {/* Normal — 72% */}
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3.5"
                                    strokeDasharray="72 28" strokeLinecap="round" />
                                {/* Médio — 15% */}
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3.5"
                                    strokeDasharray="15 85" strokeDashoffset="-72" strokeLinecap="round" />
                                {/* Alto — 13% */}
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="3.5"
                                    strokeDasharray="13 87" strokeDashoffset="-87" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-gray-900">215</span>
                                <span className="text-xs text-gray-400">gestantes</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shrink-0" />
                                <span className="text-sm text-gray-600 font-medium">Normal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full w-3/4" />
                                </div>
                                <span className="text-sm font-black text-gray-900 w-8 text-right">155</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shrink-0" />
                                <span className="text-sm text-gray-600 font-medium">Atenção</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-400 rounded-full w-1/4" />
                                </div>
                                <span className="text-sm font-black text-gray-900 w-8 text-right">33</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500 inline-block shrink-0" />
                                <span className="text-sm text-gray-600 font-medium">Alto Risco</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 rounded-full w-1/6" />
                                </div>
                                <span className="text-sm font-black text-gray-900 w-8 text-right">27</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 3 — Profissionais + Unidades */}
            <div className="grid grid-cols-2 gap-5">

                {/* Profissionais */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center">
                                <Stethoscope size={14} className="text-white" />
                            </div>
                            <span className="font-black text-gray-900 text-base">Profissionais</span>
                        </div>
                        <button className="text-pink-500 text-xs font-bold hover:text-pink-700 transition-colors">
                            Gerir todos
                        </button>
                    </div>

                    <div>
                        {mockProfissionais.map((p) => (
                            <div
                                key={p.id}
                                className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-none hover:bg-gray-50/60 transition-colors cursor-pointer"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-pink-100 rounded-xl flex items-center justify-center text-violet-700 font-black text-xs shrink-0">
                                    {p.avatar}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-sm">{p.nome}</p>
                                    <p className="text-xs text-gray-400">{p.especialidade}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-black text-gray-900">{p.gestantes}</p>
                                    <p className="text-xs text-gray-400">gestantes</p>
                                </div>
                                {p.status === "ativo" ? (
                                    <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                        Activo
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 bg-gray-100 text-gray-400 text-xs font-bold px-2.5 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                                        Inactivo
                                    </span>
                                )}
                                <ChevronRight size={15} className="text-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Unidades de saúde */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-sky-700 rounded-lg flex items-center justify-center">
                                <MapPin size={14} className="text-white" />
                            </div>
                            <span className="font-black text-gray-900 text-base">Unidades de Saúde</span>
                        </div>
                        <span className="bg-sky-50 text-sky-600 text-xs font-bold px-3 py-1 rounded-full">4 unidades</span>
                    </div>

                    <div>
                        {mockUnidades.map((u) => (
                            <div
                                key={u.id}
                                className="px-6 py-4 border-b border-gray-50 last:border-none hover:bg-gray-50/60 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1 pr-4">
                                        <p className="font-bold text-gray-900 text-sm leading-snug">{u.nome}</p>
                                    </div>
                                    <ChevronRight size={15} className="text-gray-200 shrink-0 mt-0.5" />
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 bg-pink-50 rounded-lg px-2.5 py-1.5">
                                        <Baby size={12} className="text-pink-500" />
                                        <span className="text-xs font-bold text-pink-600">{u.gestantes} gestantes</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-violet-50 rounded-lg px-2.5 py-1.5">
                                        <Calendar size={12} className="text-violet-500" />
                                        <span className="text-xs font-bold text-violet-600">{u.consultas} consultas</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-red-50 rounded-lg px-2.5 py-1.5">
                                        <AlertTriangle size={12} className="text-red-500" />
                                        <span className="text-xs font-bold text-red-500">{u.risco} risco</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}