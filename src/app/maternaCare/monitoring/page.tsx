"use client";

import { useState } from "react";
import {
    Heart, Activity, Baby, Droplets, Wind, Thermometer,
    TrendingUp, TrendingDown, ChevronRight, AlertCircle,
    CheckCircle, Info, Calendar, Scale, Ruler, Clock,
    Star, ArrowUp, ArrowDown, Minus, Zap
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────
const gestacao = {
    semanaAtual: 32,
    diasRestantes: 56,
    dataProvavel: "23 Abril 2026",
    trimestre: 3,
    pesoMae: 72.4,
    alturaUterina: 31,
    movimentosFetais: 18,
    pressaoSistolica: 118,
    pressaoDiastolica: 76,
    hemoglobina: 11.2,
    glicemia: 88,
    bebe: {
        pesoEstimado: 1850,
        comprimento: 42,
        posicao: "Cefálica",
        batimentosCardiacos: 142,
        liquidoAmniotico: "Normal",
        placentaLocalizacao: "Fúndica posterior",
    }
};

const evolucaoPeso = [
    { semana: 20, peso: 63.2 },
    { semana: 22, peso: 64.1 },
    { semana: 24, peso: 65.5 },
    { semana: 26, peso: 66.8 },
    { semana: 28, peso: 68.3 },
    { semana: 30, peso: 70.1 },
    { semana: 32, peso: 72.4 },
];

const evolucaoBCF = [
    { semana: 20, bcf: 148 },
    { semana: 22, bcf: 145 },
    { semana: 24, bcf: 150 },
    { semana: 26, bcf: 143 },
    { semana: 28, bcf: 138 },
    { semana: 30, bcf: 140 },
    { semana: 32, bcf: 142 },
];

const sintomas = [
    { id: 1, label: "Náuseas", intensidade: 1, icon: "🤢" },
    { id: 2, label: "Inchaço nos pés", intensidade: 2, icon: "🦶" },
    { id: 3, label: "Dor lombar", intensidade: 2, icon: "🔙" },
    { id: 4, label: "Azia", intensidade: 1, icon: "🔥" },
    { id: 5, label: "Fadiga", intensidade: 3, icon: "😴" },
];

const checklistSemana = [
    { id: 1, label: "Tomar suplemento de ferro", done: true },
    { id: 2, label: "Tomar ácido fólico", done: true },
    { id: 3, label: "Registar movimentos fetais", done: true },
    { id: 4, label: "Exercício leve (30 min)", done: false },
    { id: 5, label: "Consulta pré-natal", done: false },
    { id: 6, label: "Ecografia do 3º trimestre", done: false },
];

const desenvolvimentoBebe = [
    { semana: 28, marco: "Abre e fecha os olhos", icon: "👁️" },
    { semana: 29, marco: "Começa a acumular gordura", icon: "🌱" },
    { semana: 30, marco: "Cérebro em rápido desenvolvimento", icon: "🧠" },
    { semana: 31, marco: "Processa informações sensoriais", icon: "✨" },
    { semana: 32, marco: "Pulmões quase maduros", icon: "🫁" },
    { semana: 33, marco: "Sistema imunológico em formação", icon: "🛡️" },
    { semana: 34, marco: "Sistema nervoso completo", icon: "⚡" },
];

const alertas = [
    { id: 1, msg: "Hemoglobina ligeiramente baixa (11.2 g/dL). Continue o suplemento de ferro.", tipo: "atencao" },
    { id: 2, msg: "Pressão arterial dentro dos valores normais. Excelente!", tipo: "ok" },
    { id: 3, msg: "Movimentos fetais adequados. Registe diariamente.", tipo: "info" },
];

// ─── Helpers ─────────────────────────────────────────────────
const maxPeso = Math.max(...evolucaoPeso.map(p => p.peso));
const minPeso = Math.min(...evolucaoPeso.map(p => p.peso));
const maxBCF = Math.max(...evolucaoBCF.map(b => b.bcf));
const minBCF = Math.min(...evolucaoBCF.map(b => b.bcf));

function normalize(val, min, max, height = 80) {
    return height - ((val - min) / (max - min + 1)) * height;
}

function SparkLine({ data, valueKey, color, height = 80 }) {
    const vals = data.map(d => d[valueKey]);
    const mn = Math.min(...vals) - 1;
    const mx = Math.max(...vals) + 1;
    const w = 200;
    const step = w / (data.length - 1);
    const points = data.map((d, i) => {
        const x = i * step;
        const y = height - ((d[valueKey] - mn) / (mx - mn)) * height;
        return `${x},${y}`;
    }).join(" ");
    const areaPoints = `0,${height} ${points} ${w},${height}`;
    return (
        <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id={`grad-${valueKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            <polyline fill={`url(#grad-${valueKey})`} stroke="none" points={areaPoints} />
            <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
            {data.map((d, i) => {
                const x = i * step;
                const y = height - ((d[valueKey] - mn) / (mx - mn)) * height;
                return i === data.length - 1
                    ? <circle key={i} cx={x} cy={y} r="4" fill="white" stroke={color} strokeWidth="2" />
                    : null;
            })}
        </svg>
    );
}

function IntensidadeDots({ value }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3].map(i => (
                <span key={i} className={`w-2 h-2 rounded-full ${i <= value
                        ? value === 1 ? "bg-emerald-400" : value === 2 ? "bg-amber-400" : "bg-red-400"
                        : "bg-gray-200"
                    }`} />
            ))}
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────
export default function MonitoringPage() {
    const [activeTab, setActiveTab] = useState("visao-geral");
    const progressPct = Math.round((gestacao.semanaAtual / 40) * 100);

    const tabs = [
        { id: "visao-geral", label: "Visão Geral" },
        { id: "bebe", label: "Bebé" },
        { id: "mae", label: "Saúde Materna" },
        { id: "sintomas", label: "Sintomas" },
    ];

    return (
        <div className="min-h-screen bg-rose-50/40 p-8">

            {/* Page header */}
            <div className="mb-8">
                <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Acompanhamento</p>
                <h1 className="text-2xl font-black text-gray-900">Monitorização da Gestação</h1>
                <p className="text-sm text-gray-400 mt-1">Semana {gestacao.semanaAtual} · {gestacao.diasRestantes} dias para o parto</p>
            </div>

            {/* Hero card — gestação progress */}
            <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-violet-600 rounded-3xl p-6 mb-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 right-32 w-28 h-28 bg-white/5 rounded-full" />
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full" />

                <div className="relative flex items-center gap-8">
                    {/* Baby silhouette */}
                    <div className="w-24 h-24 bg-white/20 rounded-3xl border border-white/30 flex items-center justify-center shrink-0 backdrop-blur-sm">
                        <Baby size={46} className="text-white/90" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-white/20 border border-white/30 rounded-xl px-3 py-1.5">
                                <span className="text-white font-black text-sm">Semana {gestacao.semanaAtual}</span>
                            </div>
                            <div className="bg-white/20 border border-white/30 rounded-xl px-3 py-1.5">
                                <span className="text-white/90 font-bold text-sm">{gestacao.trimestre}º Trimestre</span>
                            </div>
                        </div>

                        <p className="text-white font-black text-xl mb-1 leading-tight">
                            Faltam <span className="text-yellow-200">{gestacao.diasRestantes} dias</span> para o parto
                        </p>
                        <p className="text-white/70 text-sm font-medium mb-4">Data provável: {gestacao.dataProvavel}</p>

                        {/* Progress bar */}
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-white/60 text-xs font-semibold">Início</span>
                                <span className="text-white/60 text-xs font-semibold">40 semanas</span>
                            </div>
                            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                                <div className="h-full rounded-full bg-white relative" style={{ width: `${progressPct}%` }}>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-300 rounded-full shadow-lg -mr-1.5" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-1.5">
                                <span className="text-white/60 text-xs font-semibold">0 sem.</span>
                                <span className="text-yellow-200 text-xs font-black">{progressPct}% concluído</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick vitals */}
                    <div className="flex flex-col gap-3 shrink-0">
                        <div className="bg-white/15 border border-white/20 rounded-2xl px-4 py-3 text-center backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Heart size={13} className="text-pink-200 fill-pink-200" />
                            </div>
                            <p className="text-white font-black text-lg leading-none">{gestacao.bebe.batimentosCardiacos}</p>
                            <p className="text-white/60 text-xs mt-0.5">BCF bpm</p>
                        </div>
                        <div className="bg-white/15 border border-white/20 rounded-2xl px-4 py-3 text-center backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Activity size={13} className="text-purple-200" />
                            </div>
                            <p className="text-white font-black text-lg leading-none">{gestacao.movimentosFetais}</p>
                            <p className="text-white/60 text-xs mt-0.5">Movimentos</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alertas */}
            <div className="flex flex-col gap-2 mb-6">
                {alertas.map(a => (
                    <div key={a.id} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${a.tipo === "atencao" ? "bg-amber-50 border-amber-200 border-l-4 border-l-amber-400"
                            : a.tipo === "ok" ? "bg-emerald-50 border-emerald-100 border-l-4 border-l-emerald-500"
                                : "bg-sky-50 border-sky-100 border-l-4 border-l-sky-400"
                        }`}>
                        {a.tipo === "atencao" ? <AlertCircle size={15} className="text-amber-500 shrink-0" />
                            : a.tipo === "ok" ? <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                                : <Info size={15} className="text-sky-500 shrink-0" />}
                        <p className={`text-sm font-semibold flex-1 ${a.tipo === "atencao" ? "text-amber-700"
                                : a.tipo === "ok" ? "text-emerald-700"
                                    : "text-sky-700"
                            }`}>{a.msg}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 mb-6 w-fit">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === t.id
                                ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md shadow-pink-200"
                                : "text-gray-400 hover:text-gray-700"
                            }`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ── TAB: Visão geral ─────────────────────────────────── */}
            {activeTab === "visao-geral" && (
                <div className="grid grid-cols-3 gap-5">

                    {/* Left 2 cols */}
                    <div className="col-span-2 flex flex-col gap-5">

                        {/* Vitais cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Pressão arterial */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                                            <Activity size={17} className="text-red-400" />
                                        </div>
                                        <p className="text-sm font-black text-gray-900">Pressão Arterial</p>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full">Normal</span>
                                </div>
                                <div className="flex items-end gap-1 mb-1">
                                    <span className="text-3xl font-black text-gray-900">{gestacao.pressaoSistolica}</span>
                                    <span className="text-lg font-black text-gray-400 mb-0.5">/{gestacao.pressaoDiastolica}</span>
                                    <span className="text-sm text-gray-400 mb-1 ml-1">mmHg</span>
                                </div>
                                <p className="text-xs text-gray-400">Referência: &lt;140/90 mmHg</p>
                                <div className="mt-3 h-14">
                                    <SparkLine data={[
                                        { s: 1, v: 115 }, { s: 2, v: 118 }, { s: 3, v: 112 },
                                        { s: 4, v: 120 }, { s: 5, v: 116 }, { s: 6, v: 118 }
                                    ]} valueKey="v" color="#ef4444" height={56} />
                                </div>
                            </div>

                            {/* Peso */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
                                            <Scale size={17} className="text-violet-500" />
                                        </div>
                                        <p className="text-sm font-black text-gray-900">Peso Materno</p>
                                    </div>
                                    <span className="flex items-center gap-1 bg-violet-50 text-violet-600 text-xs font-bold px-2.5 py-1 rounded-full">
                                        <TrendingUp size={11} /> +9.2 kg
                                    </span>
                                </div>
                                <div className="flex items-end gap-1 mb-1">
                                    <span className="text-3xl font-black text-gray-900">{gestacao.pesoMae}</span>
                                    <span className="text-sm text-gray-400 mb-1 ml-1">kg</span>
                                </div>
                                <p className="text-xs text-gray-400">Ganho esperado: 11–16 kg</p>
                                <div className="mt-3 h-14">
                                    <SparkLine data={evolucaoPeso} valueKey="peso" color="#7c3aed" height={56} />
                                </div>
                            </div>

                            {/* Hemoglobina */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                                            <Droplets size={17} className="text-red-500" />
                                        </div>
                                        <p className="text-sm font-black text-gray-900">Hemoglobina</p>
                                    </div>
                                    <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full">Atenção</span>
                                </div>
                                <div className="flex items-end gap-1 mb-1">
                                    <span className="text-3xl font-black text-gray-900">{gestacao.hemoglobina}</span>
                                    <span className="text-sm text-gray-400 mb-1 ml-1">g/dL</span>
                                </div>
                                <p className="text-xs text-gray-400">Referência: ≥11.0 g/dL</p>
                                {/* Bar */}
                                <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: "70%" }} />
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-400">8</span>
                                    <span className="text-xs text-gray-400">16 g/dL</span>
                                </div>
                            </div>

                            {/* Glicemia */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center">
                                            <Zap size={17} className="text-sky-500" />
                                        </div>
                                        <p className="text-sm font-black text-gray-900">Glicemia em Jejum</p>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-full">Normal</span>
                                </div>
                                <div className="flex items-end gap-1 mb-1">
                                    <span className="text-3xl font-black text-gray-900">{gestacao.glicemia}</span>
                                    <span className="text-sm text-gray-400 mb-1 ml-1">mg/dL</span>
                                </div>
                                <p className="text-xs text-gray-400">Referência: 70–92 mg/dL</p>
                                <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: "60%" }} />
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-400">70</span>
                                    <span className="text-xs text-gray-400">140 mg/dL</span>
                                </div>
                            </div>
                        </div>

                        {/* BCF chart */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 bg-pink-50 rounded-xl flex items-center justify-center">
                                        <Heart size={17} className="text-pink-500 fill-pink-400" />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 text-sm">Batimentos Cardíacos Fetais</p>
                                        <p className="text-xs text-gray-400">Evolução ao longo das semanas</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-pink-500">{gestacao.bebe.batimentosCardiacos}</p>
                                    <p className="text-xs text-gray-400">bpm · semana 32</p>
                                </div>
                            </div>
                            <div className="h-20">
                                <SparkLine data={evolucaoBCF} valueKey="bcf" color="#ec4899" height={80} />
                            </div>
                            <div className="flex justify-between mt-2">
                                {evolucaoBCF.map(d => (
                                    <span key={d.semana} className="text-xs text-gray-300 font-medium">S{d.semana}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                                <span className="text-xs text-gray-400">Referência normal: <strong className="text-gray-600">110–160 bpm</strong></span>
                                <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 ml-auto bg-emerald-50 px-2.5 py-1 rounded-full"><CheckCircle size={11} /> Dentro do normal</span>
                            </div>
                        </div>
                    </div>

                    {/* Right col */}
                    <div className="flex flex-col gap-5">

                        {/* Checklist */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-600 rounded-lg flex items-center justify-center">
                                    <CheckCircle size={15} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-sm">Checklist — Semana {gestacao.semanaAtual}</p>
                                    <p className="text-xs text-gray-400">{checklistSemana.filter(c => c.done).length}/{checklistSemana.length} concluídos</p>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden mb-4">
                                <div className="h-full bg-gradient-to-r from-pink-500 to-violet-600 rounded-full transition-all"
                                    style={{ width: `${(checklistSemana.filter(c => c.done).length / checklistSemana.length) * 100}%` }} />
                            </div>

                            <div className="space-y-2.5">
                                {checklistSemana.map(item => (
                                    <div key={item.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${item.done ? "bg-emerald-50" : "bg-gray-50"}`}>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-emerald-500" : "bg-gray-200"}`}>
                                            {item.done && <CheckCircle size={12} className="text-white" />}
                                        </div>
                                        <p className={`text-xs font-semibold flex-1 ${item.done ? "text-emerald-700 line-through" : "text-gray-600"}`}>
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Altura uterina */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                    <Ruler size={15} className="text-emerald-500" />
                                </div>
                                <p className="font-black text-gray-900 text-sm">Altura Uterina</p>
                            </div>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-3xl font-black text-gray-900">{gestacao.alturaUterina}</span>
                                <span className="text-sm text-gray-400 mb-1 ml-1">cm</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-3">Esperado: ~32 cm na semana 32</p>
                            {/* Vertical bar */}
                            <div className="flex items-end gap-3">
                                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden rotate-0">
                                    <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style={{ width: "97%" }} />
                                </div>
                                <span className="text-xs font-black text-emerald-600">97%</span>
                            </div>
                        </div>

                        {/* Movimentos fetais */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                                    <Activity size={15} className="text-violet-500" />
                                </div>
                                <p className="font-black text-gray-900 text-sm">Movimentos Fetais</p>
                            </div>
                            <p className="text-3xl font-black text-gray-900 mb-1">{gestacao.movimentosFetais}</p>
                            <p className="text-xs text-gray-400 mb-3">Registados hoje · Mínimo 10/dia</p>
                            <div className="flex gap-1.5 flex-wrap">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div key={i} className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${i < gestacao.movimentosFetais ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-300"}`}>
                                        {i < gestacao.movimentosFetais ? "👣" : "·"}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-1.5 mt-3 bg-emerald-50 rounded-xl px-3 py-2">
                                <CheckCircle size={13} className="text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-700">Acima do mínimo recomendado</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── TAB: Bebé ─────────────────────────────────────────── */}
            {activeTab === "bebe" && (
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2 flex flex-col gap-5">

                        {/* Bebé stats grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "Peso estimado", value: `${gestacao.bebe.pesoEstimado}g`, icon: Scale, color: "pink", sub: "~1.85 kg" },
                                { label: "Comprimento", value: `${gestacao.bebe.comprimento}cm`, icon: Ruler, color: "violet", sub: "Semana 32" },
                                { label: "BCF", value: `${gestacao.bebe.batimentosCardiacos}bpm`, icon: Heart, color: "red", sub: "Normal" },
                            ].map(({ label, value, icon: Icon, color, sub }) => (
                                <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm text-center">
                                    <div className={`w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center bg-${color}-50`}>
                                        <Icon size={18} className={`text-${color}-500`} />
                                    </div>
                                    <p className="text-2xl font-black text-gray-900">{value}</p>
                                    <p className="text-xs font-bold text-gray-500 mt-1">{label}</p>
                                    <p className="text-xs text-gray-400">{sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Detalhes ecográficos */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-600 rounded-lg flex items-center justify-center">
                                    <Baby size={15} className="text-white" />
                                </div>
                                <p className="font-black text-gray-900">Dados Ecográficos</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Posição do bebé", value: gestacao.bebe.posicao, status: "ok" },
                                    { label: "Líquido amniótico", value: gestacao.bebe.liquidoAmniotico, status: "ok" },
                                    { label: "Localização da placenta", value: gestacao.bebe.placentaLocalizacao, status: "ok" },
                                    { label: "Colo uterino", value: "Fechado · 3.5 cm", status: "ok" },
                                    { label: "Índice de líquido (ILA)", "value": "14.2 cm", status: "ok" },
                                    { label: "Biometria fetal", value: "Compatível com 32s", status: "ok" },
                                ].map(({ label, value, status }) => (
                                    <div key={label} className="bg-gray-50 rounded-xl p-3.5">
                                        <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="font-black text-gray-900 text-sm">{value}</p>
                                            <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desenvolvimento */}
                    <div className="flex flex-col gap-5">
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                                    <Star size={15} className="text-pink-500" />
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-sm">Desenvolvimento</p>
                                    <p className="text-xs text-gray-400">Marcos recentes e próximos</p>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />

                                <div className="space-y-1">
                                    {desenvolvimentoBebe.map((d) => {
                                        const current = d.semana === gestacao.semanaAtual;
                                        const past = d.semana < gestacao.semanaAtual;
                                        return (
                                            <div key={d.semana} className={`relative flex items-start gap-3 pl-10 py-2 rounded-xl transition-colors ${current ? "bg-pink-50" : ""}`}>
                                                {/* Dot */}
                                                <div className={`absolute left-2.5 top-3 w-3 h-3 rounded-full border-2 -translate-x-1/2 shrink-0 ${current ? "bg-pink-500 border-pink-300 shadow-md shadow-pink-200"
                                                        : past ? "bg-emerald-400 border-emerald-200"
                                                            : "bg-gray-200 border-gray-100"
                                                    }`} />

                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm">{d.icon}</span>
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${current ? "bg-pink-100 text-pink-600"
                                                                : past ? "bg-emerald-50 text-emerald-600"
                                                                    : "bg-gray-100 text-gray-400"
                                                            }`}>S{d.semana}</span>
                                                        {current && <span className="text-xs font-black text-pink-500">← Agora</span>}
                                                    </div>
                                                    <p className={`text-xs mt-1 font-semibold ${past || current ? "text-gray-700" : "text-gray-400"}`}>{d.marco}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── TAB: Saúde Materna ────────────────────────────────── */}
            {activeTab === "mae" && (
                <div className="grid grid-cols-2 gap-5">

                    {/* Peso evolution */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
                                    <TrendingUp size={15} className="text-violet-500" />
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-sm">Evolução do Peso</p>
                                    <p className="text-xs text-gray-400">Da semana 20 até agora</p>
                                </div>
                            </div>
                            <span className="text-2xl font-black text-violet-600">{gestacao.pesoMae} kg</span>
                        </div>
                        <div className="h-24 mb-2">
                            <SparkLine data={evolucaoPeso} valueKey="peso" color="#7c3aed" height={96} />
                        </div>
                        <div className="flex justify-between">
                            {evolucaoPeso.map(d => (
                                <span key={d.semana} className="text-xs text-gray-300 font-medium">S{d.semana}</span>
                            ))}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {[
                                { label: "Inicial", value: "63.2 kg" },
                                { label: "Actual", value: `${gestacao.pesoMae} kg` },
                                { label: "Ganho", value: "+9.2 kg" },
                            ].map(({ label, value }) => (
                                <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                                    <p className="text-sm font-black text-gray-900">{value}</p>
                                    <p className="text-xs text-gray-400">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Análises laboratoriais */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                                <Droplets size={15} className="text-red-400" />
                            </div>
                            <p className="font-black text-gray-900 text-sm">Análises Laboratoriais</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: "Hemoglobina", value: "11.2 g/dL", ref: "≥11.0", status: "atencao" },
                                { label: "Glicemia", value: "88 mg/dL", ref: "70–92", status: "ok" },
                                { label: "Proteína urina", value: "Negativa", ref: "Negativa", status: "ok" },
                                { label: "HIV", value: "Negativo", ref: "Negativo", status: "ok" },
                                { label: "Sífilis (VDRL)", value: "Não reactivo", ref: "Neg.", status: "ok" },
                                { label: "Grupo sanguíneo", "value": "A+", ref: "—", status: "info" },
                            ].map(({ label, value, ref, status }) => (
                                <div key={label} className={`flex items-center gap-3 p-3 rounded-xl border ${status === "ok" ? "bg-emerald-50 border-emerald-100"
                                        : status === "atencao" ? "bg-amber-50 border-amber-100"
                                            : "bg-sky-50 border-sky-100"
                                    }`}>
                                    {status === "ok" ? <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                                        : status === "atencao" ? <AlertCircle size={14} className="text-amber-500 shrink-0" />
                                            : <Info size={14} className="text-sky-400 shrink-0" />}
                                    <p className="text-sm font-bold text-gray-700 flex-1">{label}</p>
                                    <p className={`text-sm font-black ${status === "ok" ? "text-emerald-700" : status === "atencao" ? "text-amber-700" : "text-sky-700"
                                        }`}>{value}</p>
                                    <p className="text-xs text-gray-400 w-20 text-right">Ref: {ref}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vacinação */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                <CheckCircle size={15} className="text-emerald-500" />
                            </div>
                            <p className="font-black text-gray-900 text-sm">Vacinação</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { vacina: "Tétano (TT1)", data: "10 Jan 2026", feita: true },
                                { vacina: "Tétano (TT2)", data: "10 Mar 2026", feita: false },
                                { vacina: "Influenza", data: "15 Jan 2026", feita: true },
                                { vacina: "COVID-19 (booster)", "data": "20 Dez 2025", feita: true },
                            ].map(({ vacina, data, feita }) => (
                                <div key={vacina} className={`flex items-center gap-3 p-3 rounded-xl ${feita ? "bg-emerald-50" : "bg-amber-50"}`}>
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${feita ? "bg-emerald-100" : "bg-amber-100"}`}>
                                        {feita ? <CheckCircle size={14} className="text-emerald-600" /> : <Clock size={14} className="text-amber-500" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-black ${feita ? "text-emerald-800" : "text-amber-800"}`}>{vacina}</p>
                                        <p className={`text-xs ${feita ? "text-emerald-600" : "text-amber-600"}`}>{feita ? "Administrada em" : "Prevista para"} {data}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${feita ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                        {feita ? "Feita" : "Pendente"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suplementos */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                                <Zap size={15} className="text-sky-500" />
                            </div>
                            <p className="font-black text-gray-900 text-sm">Suplementos Prescritos</p>
                        </div>
                        <div className="space-y-3">
                            {[
                                { nome: "Sulfato Ferroso", dose: "200mg · 1x dia", horario: "Manhã", tomou: true },
                                { nome: "Ácido Fólico", dose: "5mg · 1x dia", horario: "Manhã", tomou: true },
                                { nome: "Cálcio", dose: "600mg · 2x dia", horario: "Manhã e noite", tomou: true },
                                { nome: "Vitamina D", dose: "400UI · 1x dia", horario: "Almoço", tomou: false },
                            ].map(({ nome, dose, horario, tomou }) => (
                                <div key={nome} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tomou ? "bg-sky-100" : "bg-gray-200"}`}>
                                        <Droplets size={13} className={tomou ? "text-sky-500" : "text-gray-400"} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-gray-800">{nome}</p>
                                        <p className="text-xs text-gray-400">{dose} · {horario}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tomou ? "bg-sky-100 text-sky-700" : "bg-gray-200 text-gray-500"}`}>
                                        {tomou ? "Tomado" : "Pendente"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── TAB: Sintomas ─────────────────────────────────────── */}
            {activeTab === "sintomas" && (
                <div className="grid grid-cols-2 gap-5">

                    {/* Sintomas actuais */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                                <Thermometer size={15} className="text-pink-500" />
                            </div>
                            <div>
                                <p className="font-black text-gray-900 text-sm">Sintomas Actuais</p>
                                <p className="text-xs text-gray-400">Semana {gestacao.semanaAtual}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {sintomas.map(s => (
                                <div key={s.id} className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                                    <span className="text-xl">{s.icon}</span>
                                    <p className="font-bold text-gray-800 text-sm flex-1">{s.label}</p>
                                    <IntensidadeDots value={s.intensidade} />
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ml-2 ${s.intensidade === 1 ? "bg-emerald-50 text-emerald-600"
                                            : s.intensidade === 2 ? "bg-amber-50 text-amber-600"
                                                : "bg-red-50 text-red-500"
                                        }`}>
                                        {s.intensidade === 1 ? "Leve" : s.intensidade === 2 ? "Moderado" : "Intenso"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-3 bg-pink-50 border border-pink-100 rounded-xl text-pink-600 text-sm font-bold hover:bg-pink-100 transition-colors flex items-center justify-center gap-2">
                            <Plus size={15} /> Registar novo sintoma
                        </button>
                    </div>

                    {/* O que é normal */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                                    <Info size={15} className="text-sky-500" />
                                </div>
                                <p className="font-black text-gray-900 text-sm">Normal na Semana {gestacao.semanaAtual}</p>
                            </div>
                            <div className="space-y-2.5">
                                {[
                                    "Movimentos fetais mais intensos e frequentes",
                                    "Dificuldade em respirar (útero comprime o diafragma)",
                                    "Dor nas costas e pressão pélvica",
                                    "Inchaço leve nos tornozelos ao final do dia",
                                    "Insónia e dificuldade em encontrar posição confortável",
                                    "Corrimento vaginal branco sem odor (leucorreia)",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5 bg-sky-50/50 rounded-xl p-2.5">
                                        <CheckCircle size={13} className="text-sky-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-gray-600 font-medium leading-snug">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                    <AlertCircle size={15} className="text-red-500" />
                                </div>
                                <p className="font-black text-red-700 text-sm">Quando ir à Urgência</p>
                            </div>
                            <div className="space-y-2">
                                {[
                                    "Sangramento vaginal abundante",
                                    "Dor abdominal intensa e persistente",
                                    "Ausência de movimentos fetais por 12h",
                                    "Pressão arterial muito elevada (>140/90)",
                                    "Visão turva, dor de cabeça intensa",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2 bg-red-100/50 rounded-xl p-2.5">
                                        <AlertCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-red-700 font-semibold leading-snug">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Plus({ size, className }: any) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}