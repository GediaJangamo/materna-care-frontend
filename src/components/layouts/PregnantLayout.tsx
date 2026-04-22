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

    return (
        <SidebarProvider>
            <div lang="en" className="flex min-h-screen w-full overflow-x-hidden bg-gray-50">


                <Sidebar variant="inset" collapsible="icon" aria-label="Main navigation sidebar">

                    <SidebarHeader className="border-b border-gray-100 bg-white px-4 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-md shadow-pink-200">
                                <Heart className="h-4 w-4 fill-white text-white" aria-hidden="true" />
                            </div>
                            <span className="text-[1.1rem] font-black tracking-tight text-gray-900">
                                Materna<span className="text-pink-500">Care</span>
                            </span>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="bg-white px-2 py-3">
                        <SidebarMenu role="list" aria-label="Menu items">
                            {menu.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.href} role="listitem">
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={[
                                                "my-0.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2",
                                                isActive
                                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-200/60"
                                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                                            ].join(" ")}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            <Link href={item.href}>
                                                <item.icon
                                                    className={[
                                                        "h-4 w-4",
                                                        isActive ? "text-white" : "text-gray-400",
                                                    ].join(" ")}
                                                    aria-hidden="true"
                                                />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                </Sidebar>


                <main className="flex flex-1 flex-col overflow-y-auto min-w-0" id="main-content" tabIndex={-1}>


                    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 bg-white/90 px-3 sm:px-6 backdrop-blur-md">


                        <div className="flex items-center gap-2 sm:gap-3">
                            <SidebarTrigger
                                className="rounded-lg text-gray-400 hover:bg-pink-50 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                aria-label="Toggle sidebar"
                            />
                            <div className="h-5 w-px bg-gray-200" aria-hidden="true" />
                            <span
                                className="rounded-full border border-pink-200 bg-pink-50 px-2 sm:px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-pink-500"
                                aria-label="User role: Pregnant"
                            >
                                Pregnant
                            </span>
                        </div>


                        <div className="flex items-center gap-1.5 sm:gap-2">


                            <button
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 shadow-sm transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                aria-label="Notifications"
                            >
                                <Bell className="h-4 w-4" aria-hidden="true" />
                            </button>


                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className="flex items-center gap-2.5 rounded-full border border-gray-100 bg-white shadow-sm transition-all hover:border-pink-200 hover:shadow-md py-1.5 pl-1.5 pr-1.5 sm:pr-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        aria-label="Open user menu"
                                    >
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-sm flex-shrink-0">
                                            <User className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                                        </div>

                                        <div className="hidden sm:block text-left">
                                            <p className="text-[0.78rem] font-bold leading-none text-gray-800">Maria Silva</p>
                                            <p className="mt-0.5 text-[0.65rem] font-medium leading-none text-gray-400">
                                                28 wk · Pregnant
                                            </p>
                                        </div>
                                        <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-gray-300" aria-hidden="true" />
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 overflow-hidden rounded-2xl bg-white border border-gray-100 p-2 shadow-xl shadow-gray-200/60"
                                >
                                    <div className="mb-1.5 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-3">
                                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-pink-400">
                                            Active account
                                        </p>
                                        <p className="mt-0.5 text-[0.92rem] font-black text-gray-900">
                                            Maria Silva
                                        </p>
                                        <p className="text-[0.68rem] font-medium text-gray-400">
                                            Pregnant · 28 weeks
                                        </p>
                                    </div>

                                    <Link href="/medClinic/updatePassword">
                                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-gray-600 hover:bg-gray-50 hover:text-pink-500 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500">
                                            <Settings className="mr-2 h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                                            Change password
                                        </DropdownMenuItem>
                                    </Link>

                                    <Link href="/medClinic/updateUser">
                                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-gray-600 hover:bg-gray-50 hover:text-pink-500 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500">
                                            <User className="mr-2 h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                                            Edit profile
                                        </DropdownMenuItem>
                                    </Link>

                                    <DropdownMenuSeparator className="my-1.5 bg-gray-100" />

                                    <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-red-400 hover:bg-red-50 hover:text-red-500 focus:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400">
                                        <LogOut className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </header>


                    <div className="flex-1 p-3 sm:p-6">
                        {children}
                    </div>

                </main>
            </div>
        </SidebarProvider>
    );
}