"use client";

import { useState } from "react";
import {
    Calendar, Clock, ChevronLeft, ChevronRight, MapPin,
    Stethoscope, CheckCircle, Baby, Heart, Star, ArrowRight,
    AlertCircle, Plus, Search, Filter, X, ChevronDown,
    FileText, Eye, RotateCcw
} from "lucide-react";
import { useRouter } from "next/navigation";

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
function getDaysInMonth(y: any, m: any) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: any, m: any) { return new Date(y, m, 1).getDay(); }

function StatusBadge({ status }: any) {
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

function TipoBadge({ tipo }: any) {
    const map: any = {
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



// ─── Main page ────────────────────────────────────────────────
export default function ListAppointment(user: any) {
    // const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState("todas");
    const [search, setSearch] = useState("");
    const [successData, setSuccessData] = useState<any>(null);
    const [expanded, setExpanded] = useState(null);
    const router = useRouter()

    const filtered = consultasHistorico.filter(c => {
        const matchStatus = filterStatus === "todas" || c.status === filterStatus;
        const matchSearch = c.profissional.toLowerCase().includes(search.toLowerCase()) ||
            c.tipo.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    const proxima = consultasHistorico.find(c => c.status === "agendada");


    return (
        <div className="min-h-screen bg-rose-50/40">

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
                        onClick={() => router.push("/maternaCare/appointments/new")}
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
                                // onClick={() => setExpanded(expanded === c.id ? null : c.id)}
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


                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function selectedDateStr(data: any) {
    if (!data) return "";
    return `${data.selectedDate} de ${MONTHS[data.calMonth]} de ${data.calYear}`;
}