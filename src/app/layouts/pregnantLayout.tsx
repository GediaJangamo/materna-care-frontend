"use client";

import type React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Bell,
    ChevronDown,
    Heart,
    LogOut,
    Settings,
    User,
    Baby,
} from "lucide-react";
import {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PregnantLayout({
    children,
    menu,
}: {
    children: React.ReactNode;
    menu: typeof import("@/config/menu").menuItemsByRole["pregnant"];
}) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-50">

                {/* ── Sidebar ─────────────────────────────────────────────── */}
                <Sidebar variant="inset" collapsible="icon">

                    {/* Header */}
                    <SidebarHeader className="border-b border-gray-100 bg-white px-4 py-5">
                        <div className="flex items-center gap-3">
                            {/* Logo icon */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-md shadow-pink-200">
                                <Heart className="h-4 w-4 fill-white text-white" />
                            </div>
                            {/* Logo text */}
                            <span className="text-[1.1rem] font-black tracking-tight text-gray-900">
                                Materna<span className="text-pink-500">Care</span>
                            </span>

                        </div>
                    </SidebarHeader>

                    {/* Menu */}
                    <SidebarContent className="bg-white px-2 py-3">
                        <SidebarMenu>
                            {menu.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={[
                                                "my-0.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                                                isActive
                                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-200/60"
                                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                                            ].join(" ")}
                                        >
                                            <Link href={item.href}>
                                                <item.icon
                                                    className={[
                                                        "h-4 w-4",
                                                        isActive ? "text-white" : "text-gray-400",
                                                    ].join(" ")}
                                                />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                    {/* Footer */}
                    <SidebarFooter className="border-t border-gray-100 bg-white p-3">
                        {/* Mini user card */}
                        <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-gray-50 px-3 py-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-purple-100">
                                <Baby className="h-4 w-4 text-purple-500" />
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-700 font-bold text-gray-800">Maria Silva</p>
                                <p className="truncate text-[0.65rem] font-medium text-pink-400">
                                    28 sem · 3º trimestre
                                </p>
                            </div>
                        </div>
                        {/* Logout */}
                        <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-gray-400 transition-all hover:bg-red-50 hover:text-red-500">
                            <LogOut className="h-3.5 w-3.5" />
                            Sair da conta
                        </button>
                    </SidebarFooter>

                </Sidebar>

                {/* ── Main ────────────────────────────────────────────────── */}
                <main className="flex flex-1 flex-col overflow-y-auto">

                    {/* Header */}
                    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 bg-white/90 px-6 backdrop-blur-md">

                        {/* Left */}
                        <div className="flex items-center gap-3">
                            <SidebarTrigger className="rounded-lg text-gray-400 hover:bg-pink-50 hover:text-pink-500" />
                            {/* Thin pink line decoration */}
                            <div className="h-5 w-px bg-gray-200" />
                            {/* <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-[0.7rem] font-black uppercase tracking-[0.12em] text-transparent">
                                MaternaCare
                            </span> */}
                            <span className="ml-auto rounded-full border border-pink-200 bg-pink-50 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-pink-500">
                                Gestante
                            </span>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-2">

                            {/* Bell */}
                            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 shadow-sm transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500">
                                <Bell className="h-4 w-4" />
                            </button>

                            {/* User trigger */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2.5 rounded-full border border-gray-100 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-all hover:border-pink-200 hover:shadow-md">
                                        {/* Avatar */}
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-sm">
                                            <User className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[0.78rem] font-bold leading-none text-gray-800">Maria Silva</p>
                                            <p className="mt-0.5 text-[0.65rem] font-medium leading-none text-gray-400">
                                                28 sem · Gestante
                                            </p>
                                        </div>
                                        <ChevronDown className="h-3.5 w-3.5 text-gray-300" />
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 overflow-hidden rounded-2xl border border-gray-100 p-2 shadow-xl shadow-gray-200/60"
                                >
                                    {/* Dropdown header */}
                                    <div className="mb-1.5 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-3">
                                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-pink-400">
                                            Conta activa
                                        </p>
                                        <p className="mt-0.5 text-[0.92rem] font-black text-gray-900">
                                            Maria Silva
                                        </p>
                                        <p className="text-[0.68rem] font-medium text-gray-400">
                                            Gestante · 28 semanas
                                        </p>
                                    </div>

                                    <Link href="/medClinic/updatePassword">
                                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-gray-600 hover:bg-gray-50 hover:text-pink-500 focus:bg-gray-50">
                                            <Settings className="mr-2 h-3.5 w-3.5 text-gray-400" />
                                            Alterar senha
                                        </DropdownMenuItem>
                                    </Link>

                                    <Link href="/medClinic/updateUser">
                                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-gray-600 hover:bg-gray-50 hover:text-pink-500 focus:bg-gray-50">
                                            <User className="mr-2 h-3.5 w-3.5 text-gray-400" />
                                            Editar perfil
                                        </DropdownMenuItem>
                                    </Link>

                                    <DropdownMenuSeparator className="my-1.5 bg-gray-100" />

                                    <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-red-400 hover:bg-red-50 hover:text-red-500 focus:bg-red-50">
                                        <LogOut className="mr-2 h-3.5 w-3.5" />
                                        Sair
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </header>

                    {/* Page content */}
                    <div className="flex-1 p-6">
                        {children}
                    </div>

                </main>
            </div>
        </SidebarProvider>
    );
}