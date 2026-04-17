"use client";

import { useState } from "react";
import {
    Camera, Mail, Phone, MapPin, Lock, Bell, Shield,
    Eye, EyeOff, CheckCircle, Baby,
    Stethoscope, Settings, LogOut, Trash2,
    Heart, Edit3, Save, X, Award, Clock, Calendar
} from "lucide-react";

// ─── Mock users ───────────────────────────────────────────────
const mockUsers = {
    gestante: {
        role: "gestante",
        nome: "Fátima Dlamini",
        email: "fatima.dlamini@gmail.com",
        telefone: "+258 84 123 4567",
        cidade: "Maputo",
        avatar: "FD",
        membro: "Janeiro 2026",
        notificacoes: { sms: true, email: true, push: true, lembretes: true },
    },
    profissional: {
        role: "profissional",
        nome: "Dra. Ana Machava",
        email: "ana.machava@hcm.mz",
        telefone: "+258 82 987 6543",
        cidade: "Maputo",
        avatar: "AM",
        membro: "Março 2024",
        crm: "MOZ-OB-4421",
        especialidade: "Obstetrícia",
        instituicao: "Hospital Central de Maputo",
        anos_exp: 8,
        idiomas: ["Português", "Inglês", "Changana"],
        notificacoes: { sms: true, email: true, push: false, lembretes: true },
    },
    admin: {
        role: "admin",
        nome: "Dr. José Tembe",
        email: "jose.tembe@materna.mz",
        telefone: "+258 84 555 0001",
        cidade: "Maputo",
        avatar: "JT",
        membro: "Outubro 2023",
        departamento: "Direcção Clínica",
        nivel: "Super Administrador",
        notificacoes: { sms: false, email: true, push: true, lembretes: false },
    },
};

const roleConfig = {
    gestante: { label: "Gestante", color: "text-pink-600", bg: "bg-pink-100", border: "border-pink-200", gradient: "from-pink-500 to-rose-500" },
    profissional: { label: "Profissional", color: "text-violet-600", bg: "bg-violet-100", border: "border-violet-200", gradient: "from-violet-600 to-purple-600" },
    admin: { label: "Administrador", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", gradient: "from-slate-600 to-slate-800" },
};

// ─── Toggle ───────────────────────────────────────────────────
function Toggle({ value, onChange }) {
    return (
        <button
            onClick={() => onChange(!value)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${value ? "bg-gradient-to-r from-pink-500 to-violet-600" : "bg-gray-200"}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
        </button>
    );
}

// ─── Section ──────────────────────────────────────────────────
function Section({ title, icon: Icon, iconColor, children }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2.5">
                {Icon && (
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconColor ?? "bg-gray-50"}`}>
                        <Icon size={14} className="text-current" />
                    </div>
                )}
                <p className="font-black text-gray-900 text-sm">{title}</p>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

// ─── Field row ────────────────────────────────────────────────
function FieldRow({ label, value, icon: Icon, editing, inputProps }) {
    return (
        <div className="flex items-center gap-4 py-3.5 border-b border-gray-50 last:border-none">
            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                <Icon size={15} className="text-gray-400" />
            </div>
            <div className="flex-1">
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                {editing ? (
                    <input
                        {...inputProps}
                        className="mt-1 w-full text-sm font-bold text-gray-900 bg-pink-50 border border-pink-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                ) : (
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{value}</p>
                )}
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────
export default function ProfilePage() {
    const [currentRole, setCurrentRole] = useState("gestante");
    const user = mockUsers[currentRole];
    const cfg = roleConfig[currentRole];

    const [editing, setEditing] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [formData, setFormData] = useState({ nome: user.nome, email: user.email, telefone: user.telefone, cidade: user.cidade });
    const [notifs, setNotifs] = useState(user.notificacoes);
    const [saved, setSaved] = useState(false);

    const handleRoleSwitch = (r) => {
        setCurrentRole(r);
        setFormData({ nome: mockUsers[r].nome, email: mockUsers[r].email, telefone: mockUsers[r].telefone, cidade: mockUsers[r].cidade });
        setNotifs(mockUsers[r].notificacoes);
        setEditing(false);
    };

    const handleSave = () => {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const updateField = (field) => (e) => setFormData(p => ({ ...p, [field]: e.target.value }));
    const toggleNotif = (key) => setNotifs(p => ({ ...p, [key]: !p[key] }));

    return (
        <div className="min-h-screen bg-rose-50/40 p-8">

            {/* Role switcher — dev only */}
            <div className="flex items-center gap-2 mb-6 bg-white border border-gray-100 rounded-2xl p-1.5 w-fit shadow-sm">
                <span className="text-xs font-bold text-gray-300 px-2">Role:</span>
                {["gestante", "profissional", "admin"].map(r => (
                    <button
                        key={r}
                        onClick={() => handleRoleSwitch(r)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${currentRole === r
                            ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-md"
                            : "text-gray-400 hover:text-gray-700"
                            }`}
                    >
                        {roleConfig[r].label}
                    </button>
                ))}
            </div>

            {/* Page header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Conta</p>
                    <h1 className="text-2xl font-black text-gray-900">O meu Perfil</h1>
                    <p className="text-sm text-gray-400 mt-1">Gerir informações e preferências</p>
                </div>

                <div className="flex items-center gap-2">
                    {saved && (
                        <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-2 rounded-xl">
                            <CheckCircle size={13} /> Guardado com sucesso
                        </span>
                    )}
                    {editing ? (
                        <>
                            <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 text-sm font-bold hover:border-gray-300 transition-colors">
                                <X size={15} /> Cancelar
                            </button>
                            <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-200">
                                <Save size={15} /> Guardar alterações
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-bold hover:border-pink-300 hover:text-pink-600 transition-all">
                            <Edit3 size={15} /> Editar perfil
                        </button>
                    )}
                </div>
            </div>

            {/* Layout: left sidebar + main content */}
            <div className="flex gap-6 items-start">

                {/* ── Left sidebar ──────────────────────────────── */}
                <div className="w-72 shrink-0 flex flex-col gap-5">

                    {/* Avatar card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                        <div className="relative inline-block mb-4">
                            <div className={`w-24 h-24 bg-gradient-to-br ${cfg.gradient} rounded-3xl flex items-center justify-center font-black text-white text-2xl mx-auto shadow-lg`}>
                                {user.avatar}
                            </div>
                            {editing && (
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center shadow-sm hover:border-pink-400 transition-colors">
                                    <Camera size={14} className="text-gray-500" />
                                </button>
                            )}
                        </div>

                        <p className="font-black text-gray-900 text-lg leading-tight">
                            {editing ? formData.nome : user.nome}
                        </p>

                        <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full text-xs font-bold ${cfg.bg} ${cfg.color} ${cfg.border} border`}>
                            {currentRole === "gestante" && <Baby size={12} />}
                            {currentRole === "profissional" && <Stethoscope size={12} />}
                            {currentRole === "admin" && <Shield size={12} />}
                            {cfg.label}
                        </div>

                        <p className="text-xs text-gray-400 mt-3">Membro desde {user.membro}</p>

                        <div className="mt-5 pt-5 border-t border-gray-50 flex flex-col gap-2">
                            <button className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-gray-50 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                                <Settings size={15} className="text-gray-400" /> Definições
                            </button>
                            <button className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-red-50 rounded-xl text-sm font-bold text-red-500 hover:bg-red-100 transition-colors">
                                <LogOut size={15} /> Terminar sessão
                            </button>
                        </div>
                    </div>

                    {/* Contactos */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="font-black text-gray-900 text-sm mb-4">Contactos</p>
                        <div className="space-y-3.5">
                            {[
                                { icon: Mail, value: editing ? formData.email : user.email },
                                { icon: Phone, value: editing ? formData.telefone : user.telefone },
                                { icon: MapPin, value: editing ? formData.cidade : user.cidade },
                            ].map(({ icon: Icon, value }, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                        <Icon size={13} className="text-gray-400" />
                                    </div>
                                    <p className="text-xs text-gray-600 font-medium truncate">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Zona de perigo */}
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                        <p className="font-black text-red-500 text-sm mb-1">Zona de Perigo</p>
                        <p className="text-xs text-red-300 mb-4 leading-relaxed">Esta acção é permanente e não pode ser desfeita.</p>
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-red-200 rounded-xl text-sm font-bold text-red-500 hover:bg-red-100 transition-colors">
                            <Trash2 size={14} /> Eliminar conta
                        </button>
                    </div>
                </div>

                {/* ── Main content ──────────────────────────────── */}
                <div className="flex-1 flex flex-col gap-5">

                    {/* Dados pessoais */}
                    <Section title="Dados Pessoais">
                        <div className="grid grid-cols-2 gap-x-8">
                            <FieldRow label="Nome completo" value={user.nome} icon={Settings} editing={editing} inputProps={{ value: formData.nome, onChange: updateField("nome") }} />
                            <FieldRow label="Email" value={user.email} icon={Mail} editing={editing} inputProps={{ value: formData.email, onChange: updateField("email"), type: "email" }} />
                            <FieldRow label="Telefone" value={user.telefone} icon={Phone} editing={editing} inputProps={{ value: formData.telefone, onChange: updateField("telefone"), type: "tel" }} />
                            <FieldRow label="Cidade" value={user.cidade} icon={MapPin} editing={editing} inputProps={{ value: formData.cidade, onChange: updateField("cidade") }} />
                        </div>
                    </Section>

                    {/* Bottom grid: segurança + notificações */}
                    <div className="grid grid-cols-2 gap-5">

                        {/* Segurança */}
                        <Section title="Segurança da Conta">
                            <div className="space-y-4">

                                {/* Password actual */}
                                <div>
                                    <p className="text-xs text-gray-400 font-medium mb-2">Palavra-passe actual</p>
                                    <div className="relative">
                                        <input
                                            type={showPass ? "text" : "password"}
                                            defaultValue="supersecret123"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-pink-400 pr-10 transition-colors"
                                        />
                                        <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                                            {showPass ? <Eye size={15} /> : <EyeOff size={15} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Nova password */}
                                <div>
                                    <p className="text-xs text-gray-400 font-medium mb-2">Nova palavra-passe</p>
                                    <div className="relative">
                                        <input
                                            type={showNewPass ? "text" : "password"}
                                            placeholder="Mínimo 8 caracteres"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 pr-10 transition-colors"
                                        />
                                        <button onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                                            {showNewPass ? <Eye size={15} /> : <EyeOff size={15} />}
                                        </button>
                                    </div>
                                </div>

                                <button className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-pink-100 flex items-center justify-center gap-2">
                                    <Lock size={14} /> Actualizar palavra-passe
                                </button>

                                <div className="h-px bg-gray-100" />

                                {/* 2FA */}
                                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                            <Shield size={14} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Autenticação 2 etapas</p>
                                            <p className="text-xs text-emerald-600 font-medium">Activa · via SMS</p>
                                        </div>
                                    </div>
                                    <CheckCircle size={16} className="text-emerald-500" />
                                </div>

                                {/* Sessões */}
                                <div>
                                    <p className="text-xs text-gray-400 font-medium mb-3">Sessões activas</p>
                                    <div className="space-y-1">
                                        {[
                                            { device: "Chrome · Maputo", time: "Agora", current: true },
                                            { device: "Android App", time: "Há 2 horas", current: false },
                                        ].map(({ device, time, current }) => (
                                            <div key={device} className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-xl">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-700">{device}</p>
                                                    <p className="text-xs text-gray-400">{time}</p>
                                                </div>
                                                {current
                                                    ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Este dispositivo</span>
                                                    : <button className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors">Encerrar</button>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Notificações */}
                        <Section title="Notificações">
                            <p className="text-xs text-gray-400 mb-4 leading-relaxed">Escolha como pretende receber alertas e actualizações do MaternaCare.</p>
                            <div className="space-y-1">
                                {[
                                    { key: "sms", label: "SMS", desc: "Alertas por mensagem de texto", icon: Phone },
                                    { key: "email", label: "Email", desc: "Resumos e actualizações", icon: Mail },
                                    { key: "push", label: "Notificações push", desc: "Alertas na aplicação", icon: Bell },
                                    { key: "lembretes", label: "Lembretes consultas", desc: "24h antes da consulta", icon: Calendar },
                                ].map(({ key, label, desc, icon: Icon }) => (
                                    <div key={key} className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-none">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${notifs[key] ? "bg-pink-50" : "bg-gray-50"}`}>
                                                <Icon size={14} className={notifs[key] ? "text-pink-500" : "text-gray-300"} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{label}</p>
                                                <p className="text-xs text-gray-400">{desc}</p>
                                            </div>
                                        </div>
                                        <Toggle value={notifs[key]} onChange={() => toggleNotif(key)} />
                                    </div>
                                ))}
                            </div>

                            {/* Save notifs */}
                            <button className="mt-4 w-full py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 transition-all flex items-center justify-center gap-2">
                                <Bell size={14} /> Guardar preferências
                            </button>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}