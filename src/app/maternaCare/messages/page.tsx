"use client";

import { useState, useRef, useEffect } from "react";
import {
    Search, Send, Phone, Video, MoreVertical, ChevronLeft,
    CheckCheck, Check, Clock, Paperclip, Smile, Star,
    AlertCircle, Baby, Heart, Stethoscope, Image, X, Plus
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────
const conversas = [
    {
        id: 1,
        profissional: { nome: "Dra. Ana Machava", especialidade: "Obstetra", avatar: "AM", online: true },
        mensagens: [
            { id: 1, de: "medico", texto: "Bom dia! Como se está a sentir hoje?", hora: "09:10", lida: true },
            { id: 2, de: "gestante", texto: "Bom dia Dra. Ana! Tenho sentido alguns enjoos de manhã mas já melhorou.", hora: "09:14", lida: true },
            { id: 3, de: "medico", texto: "É completamente normal na semana 32. Tem feito as refeições fraccionadas como recomendei?", hora: "09:16", lida: true },
            { id: 4, de: "gestante", texto: "Sim, estou a comer de 3 em 3 horas. Ajudou bastante!", hora: "09:18", lida: true },
            { id: 5, de: "medico", texto: "Ótimo! Lembre-se de registar os movimentos fetais hoje. Mínimo 10 movimentos em 2 horas. Qualquer coisa, contacte-me 🙂", hora: "09:20", lida: true },
            { id: 6, de: "gestante", texto: "Já registei 18 movimentos esta manhã! Posso perguntar: é normal sentir pressão na zona pélvica?", hora: "10:45", lida: true },
            { id: 7, de: "medico", texto: "Sim, é normal! O bebé já está a descer para a posição de parto. Se a pressão for muito intensa ou vier acompanhada de dor, venha à consulta. Caso contrário, não se preocupe 😊", hora: "11:02", lida: true },
            { id: 8, de: "gestante", texto: "Obrigada Dra.! Uma última coisa — tenho consulta na sexta às 14h, está confirmado?", hora: "14:30", lida: false },
        ],
        naoLidas: 1,
        ultimaMsg: "Obrigada Dra.! Uma última coisa...",
        ultimaHora: "14:30",
    },
    {
        id: 2,
        profissional: { nome: "Dr. Carlos Sitoe", especialidade: "Ginecologista", avatar: "CS", online: false },
        mensagens: [
            { id: 1, de: "medico", texto: "Olá Fátima. Recebi os resultados das suas análises.", hora: "Seg", lida: true },
            { id: 2, de: "medico", texto: "A hemoglobina está um pouco baixa (11.2 g/dL). Vou ajustar a dose do suplemento de ferro.", hora: "Seg", lida: true },
            { id: 3, de: "gestante", texto: "Obrigada Doutor. Devo aumentar a alimentação com ferro também?", hora: "Seg", lida: true },
            { id: 4, de: "medico", texto: "Exactamente! Coma mais feijão, lentilhas, espinafres e carne vermelha. Junte vitamina C para ajudar na absorção.", hora: "Seg", lida: true },
            { id: 5, de: "gestante", texto: "Perfeito. Obrigada Doutor Carlos!", hora: "Seg", lida: true },
        ],
        naoLidas: 0,
        ultimaMsg: "Perfeito. Obrigada Doutor Carlos!",
        ultimaHora: "Seg",
    },
    {
        id: 3,
        profissional: { nome: "Dra. Lúcia Bila", especialidade: "Enf. Chefe", avatar: "LB", online: true },
        mensagens: [
            { id: 1, de: "medico", texto: "Boa tarde! Lembrete: consulta de rotina amanhã às 09:30 no HCM. Por favor confirme a sua presença.", hora: "Ter", lida: true },
            { id: 2, de: "gestante", texto: "Confirmado! Estarei lá. Devo levar algum documento específico?", hora: "Ter", lida: true },
            { id: 3, de: "medico", texto: "Sim, traga o cartão de gestante, o boletim de vacinação e os resultados das últimas análises.", hora: "Ter", lida: true },
            { id: 4, de: "gestante", texto: "Anotado! Muito obrigada Enfermeira Lúcia 🙏", hora: "Ter", lida: true },
        ],
        naoLidas: 0,
        ultimaMsg: "Anotado! Muito obrigada...",
        ultimaHora: "Ter",
    },
];

const respostasSugeridas = [
    "Obrigada pela informação!",
    "Confirmo presença na consulta.",
    "Vou seguir as recomendações.",
    "Tenho uma dúvida sobre...",
];

// ─── Sub-components ───────────────────────────────────────────
function Avatar({ initials, online, size = "md" }) {
    const sizes = { sm: "w-9 h-9 text-xs", md: "w-11 h-11 text-sm", lg: "w-14 h-14 text-base" };
    return (
        <div className="relative shrink-0">
            <div className={`${sizes[size]} bg-gradient-to-br from-pink-100 to-violet-100 rounded-2xl flex items-center justify-center font-black text-violet-700`}>
                {initials}
            </div>
            {online !== undefined && (
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${online ? "bg-emerald-400" : "bg-gray-300"}`} />
            )}
        </div>
    );
}

function BubbleMedico({ msg }) {
    return (
        <div className="flex items-end gap-2 max-w-xs lg:max-w-sm">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <p className="text-sm text-gray-800 leading-relaxed">{msg.texto}</p>
                <p className="text-xs text-gray-400 mt-1">{msg.hora}</p>
            </div>
        </div>
    );
}

function BubbleGestante({ msg }) {
    return (
        <div className="flex items-end gap-1.5 max-w-xs lg:max-w-sm ml-auto">
            <div className="bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl rounded-br-sm px-4 py-3 shadow-md shadow-pink-200">
                <p className="text-sm text-white leading-relaxed">{msg.texto}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                    <p className="text-xs text-white/60">{msg.hora}</p>
                    {msg.lida
                        ? <CheckCheck size={12} className="text-white/60" />
                        : <Check size={12} className="text-white/60" />}
                </div>
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────
export default function MensagensPage() {
    const [conversaAtiva, setConversaAtiva] = useState(1);
    const [texto, setTexto] = useState("");
    const [mensagensState, setMensagensState] = useState(conversas);
    const [mobileView, setMobileView] = useState("lista"); // "lista" | "chat"
    const [searchQuery, setSearchQuery] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const endRef = useRef(null);

    const conversa = mensagensState.find(c => c.id === conversaAtiva);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversaAtiva, mensagensState]);

    const enviarMensagem = (textoMsg) => {
        const msg = textoMsg || texto;
        if (!msg.trim()) return;

        setMensagensState(prev => prev.map(c => {
            if (c.id !== conversaAtiva) return c;
            const novaMensagem = {
                id: c.mensagens.length + 1,
                de: "gestante",
                texto: msg.trim(),
                hora: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
                lida: false
            };
            return {
                ...c,
                mensagens: [...c.mensagens, novaMensagem],
                ultimaMsg: msg.trim(),
                ultimaHora: novaMensagem.hora
            };
        }));
        setTexto("");
    };

    const filteredConversas = mensagensState.filter(c =>
        c.profissional.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.profissional.especialidade.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalNaoLidas = mensagensState.reduce((acc, c) => acc + c.naoLidas, 0);

    return (
        <div className="h-screen bg-rose-50/40 flex flex-col">

            {/* Page header */}
            <div className="px-8 pt-8 pb-4 shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Comunicação</p>
                        <h1 className="text-2xl font-black text-gray-900">Mensagens</h1>
                    </div>
                    {totalNaoLidas > 0 && (
                        <span className="bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm font-black px-3 py-1.5 rounded-full">
                            {totalNaoLidas} não lida{totalNaoLidas > 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            </div>

            {/* Main chat layout */}
            <div className="flex-1 px-8 pb-8 overflow-hidden">
                <div className="h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">

                    {/* ── Sidebar: lista de conversas ─────────────────── */}
                    <div className="w-80 border-r border-gray-100 flex flex-col shrink-0">

                        {/* Search */}
                        <div className="p-4 border-b border-gray-50">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                <input
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Pesquisar médico..."
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Conversas list */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversas.map(c => {
                                const ativa = conversaAtiva === c.id;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setConversaAtiva(c.id)}
                                        className={`w-full text-left px-4 py-4 border-b border-gray-50 last:border-none transition-all ${ativa ? "bg-pink-50/80" : "hover:bg-gray-50/60"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <Avatar initials={c.profissional.avatar} online={c.profissional.online} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <p className={`text-sm font-black truncate ${ativa ? "text-pink-600" : "text-gray-900"}`}>
                                                        {c.profissional.nome}
                                                    </p>
                                                    <span className={`text-xs shrink-0 ml-2 ${c.naoLidas > 0 ? "text-pink-500 font-bold" : "text-gray-400"}`}>
                                                        {c.ultimaHora}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-400 truncate">{c.profissional.especialidade}</p>
                                                <div className="flex items-center justify-between mt-1.5">
                                                    <p className="text-xs text-gray-400 truncate flex-1">{c.ultimaMsg}</p>
                                                    {c.naoLidas > 0 && (
                                                        <span className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ml-2">
                                                            {c.naoLidas}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {ativa && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-pink-500 to-violet-600 rounded-r-full" />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Nova mensagem */}
                        <div className="p-4 border-t border-gray-100">
                            <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-sm font-bold rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md shadow-pink-200">
                                <Plus size={15} /> Nova conversa
                            </button>
                        </div>
                    </div>

                    {/* ── Chat area ────────────────────────────────────── */}
                    {conversa ? (
                        <div className="flex-1 flex flex-col overflow-hidden">

                            {/* Chat header */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4 shrink-0 bg-white">
                                <Avatar initials={conversa.profissional.avatar} online={conversa.profissional.online} size="md" />
                                <div className="flex-1">
                                    <p className="font-black text-gray-900 text-sm">{conversa.profissional.nome}</p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                                        <Stethoscope size={11} />
                                        {conversa.profissional.especialidade}
                                        <span className="text-gray-300">·</span>
                                        <span className={`flex items-center gap-1 font-medium ${conversa.profissional.online ? "text-emerald-500" : "text-gray-400"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full inline-block ${conversa.profissional.online ? "bg-emerald-400" : "bg-gray-300"}`} />
                                            {conversa.profissional.online ? "Online" : "Offline"}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="w-9 h-9 rounded-xl bg-pink-50 hover:bg-pink-100 flex items-center justify-center transition-colors">
                                        <Phone size={16} className="text-pink-500" />
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-violet-50 hover:bg-violet-100 flex items-center justify-center transition-colors">
                                        <Video size={16} className="text-violet-500" />
                                    </button>
                                    <button className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors">
                                        <MoreVertical size={16} className="text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-3">

                                {/* Date separator */}
                                <div className="flex items-center gap-3 my-2">
                                    <div className="flex-1 h-px bg-gray-100" />
                                    <span className="text-xs text-gray-400 font-semibold bg-gray-50 px-3 py-1 rounded-full">Hoje</span>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div>

                                {conversa.mensagens.map((msg, i) => {
                                    const prevMsg = conversa.mensagens[i - 1];
                                    const sameSender = prevMsg && prevMsg.de === msg.de;
                                    return (
                                        <div key={msg.id} className={`flex ${msg.de === "gestante" ? "justify-end" : "justify-start"} ${sameSender ? "mt-0.5" : "mt-2"}`}>
                                            {msg.de === "medico"
                                                ? <BubbleMedico msg={msg} />
                                                : <BubbleGestante msg={msg} />
                                            }
                                        </div>
                                    );
                                })}

                                {/* Typing indicator */}
                                {conversa.profissional.online && (
                                    <div className="flex items-end gap-2 mt-1">
                                        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-1">{conversa.profissional.nome.split(" ")[0]} está a escrever...</p>
                                    </div>
                                )}

                                <div ref={endRef} />
                            </div>

                            {/* Quick replies */}
                            <div className="px-6 pb-2 flex items-center gap-2 overflow-x-auto shrink-0">
                                {respostasSugeridas.map((r, i) => (
                                    <button
                                        key={i}
                                        onClick={() => enviarMensagem(r)}
                                        className="shrink-0 px-3.5 py-2 bg-pink-50 border border-pink-100 rounded-xl text-xs font-bold text-pink-600 hover:bg-pink-100 transition-colors whitespace-nowrap"
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>

                            {/* Input area */}
                            <div className="px-6 py-4 border-t border-gray-100 shrink-0">
                                <div className="flex items-end gap-3">
                                    <button className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors shrink-0 mb-0.5">
                                        <Paperclip size={16} className="text-gray-400" />
                                    </button>

                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex items-end gap-2 focus-within:border-pink-400 transition-colors">
                                        <textarea
                                            value={texto}
                                            onChange={e => setTexto(e.target.value)}
                                            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviarMensagem(); } }}
                                            placeholder="Escreva a sua mensagem..."
                                            rows={1}
                                            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none max-h-28 leading-relaxed"
                                        />
                                        <button onClick={() => setShowEmoji(!showEmoji)} className="text-gray-300 hover:text-amber-400 transition-colors shrink-0 mb-0.5">
                                            <Smile size={18} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => enviarMensagem()}
                                        disabled={!texto.trim()}
                                        className="w-11 h-11 bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-pink-200 shrink-0"
                                    >
                                        <Send size={17} className="text-white ml-0.5 -rotate-0" />
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 mt-2 text-center">
                                    As mensagens são encaminhadas directamente ao profissional de saúde. Para emergências, ligue 112.
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
                            <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mb-4">
                                <Heart size={36} className="text-pink-200 fill-pink-100" />
                            </div>
                            <p className="font-black text-gray-400 text-lg">Seleccione uma conversa</p>
                            <p className="text-sm text-gray-300 mt-1">Fale com a sua equipa médica</p>
                        </div>
                    )}

                    {/* ── Info sidebar ──────────────────────────────────── */}
                    {conversa && (
                        <div className="w-72 border-l border-gray-100 flex flex-col overflow-y-auto shrink-0 bg-gray-50/50">
                            {/* Doctor profile */}
                            <div className="p-5 border-b border-gray-100 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-violet-100 rounded-3xl flex items-center justify-center font-black text-violet-700 text-lg mx-auto mb-3">
                                    {conversa.profissional.avatar}
                                </div>
                                <p className="font-black text-gray-900 text-sm">{conversa.profissional.nome}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{conversa.profissional.especialidade}</p>
                                <div className={`flex items-center justify-center gap-1.5 mt-2 text-xs font-bold ${conversa.profissional.online ? "text-emerald-500" : "text-gray-400"}`}>
                                    <span className={`w-2 h-2 rounded-full inline-block ${conversa.profissional.online ? "bg-emerald-400" : "bg-gray-300"}`} />
                                    {conversa.profissional.online ? "Disponível agora" : "Offline"}
                                </div>
                            </div>

                            {/* Quick actions */}
                            <div className="p-4 border-b border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Acções rápidas</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { label: "Ligar", icon: Phone, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                                        { label: "Vídeo", icon: Video, color: "text-violet-600 bg-violet-50 border-violet-100" },
                                        { label: "Consulta", icon: Stethoscope, color: "text-pink-600 bg-pink-50 border-pink-100" },
                                        { label: "Urgente", icon: AlertCircle, color: "text-red-600 bg-red-50 border-red-100" },
                                    ].map(({ label, icon: Icon, color }) => (
                                        <button key={label} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all hover:shadow-sm ${color}`}>
                                            <Icon size={16} />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Próxima consulta */}
                            <div className="p-4 border-b border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Próxima consulta</p>
                                <div className="bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl p-4 text-white relative overflow-hidden">
                                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
                                    <div className="relative">
                                        <p className="font-black text-sm mb-2">Consulta de Rotina</p>
                                        <div className="flex items-center gap-1.5 text-white/80 text-xs mb-1">
                                            <Clock size={11} /> Sexta, 6 Mar 2026
                                        </div>
                                        <div className="flex items-center gap-1.5 text-white/80 text-xs">
                                            <Star size={11} className="fill-white/80" /> 14:00 · HCM
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info saúde */}
                            <div className="p-4">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">A minha saúde</p>
                                <div className="space-y-2.5">
                                    {[
                                        { label: "Semana de gestação", value: "32ª semana", icon: Baby, color: "text-pink-500" },
                                        { label: "Próximo exame", value: "Eco 3º trim.", icon: Heart, color: "text-red-400" },
                                        { label: "Última consulta", value: "19 Fev 2026", icon: Clock, color: "text-violet-500" },
                                    ].map(({ label, value, icon: Icon, color }) => (
                                        <div key={label} className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-gray-100">
                                            <Icon size={14} className={color} />
                                            <div>
                                                <p className="text-xs text-gray-400 leading-none">{label}</p>
                                                <p className="text-xs font-black text-gray-800 mt-0.5">{value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// function Plus({ size, className }) {
//     return (
//         <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
//             <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
//         </svg>
//     );
// }