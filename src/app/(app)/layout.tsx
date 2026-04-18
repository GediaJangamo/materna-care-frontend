"use client";

import { useEffect, useState } from "react";
import { UserRole } from "@/enums/roles";

import { menuItemsByRole } from "@/config/menu";
import PregnantLayout from "@/components/layouts/PregnantLayout";
import ProfessionalLayout from "@/components/layouts/ProfessionalLayout";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function RoleBasedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [onlineUser, setOnlineUser] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setOnlineUser(UserRole.PREGNANT);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(t);
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d242b0] to-[#9534e8] text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <p className="text-sm">A carregar sessão...</p>
                </div>
            </div>
        );
    }


    if (onlineUser === UserRole.PREGNANT) {
        return (
            <PregnantLayout menu={menuItemsByRole.pregnant}>
                {children}
            </PregnantLayout>
        );
    }

    if (onlineUser === UserRole.PROFESSIONAL) {
        return (
            <ProfessionalLayout menu={menuItemsByRole.professional}>
                {children}
            </ProfessionalLayout>
        );
    }

    if (onlineUser === UserRole.ADMIN) {
        return (
            <AdminLayout menu={menuItemsByRole.admin}>
                {children}
            </AdminLayout>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d242b0] to-[#9534e8] text-white">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-sm">A carregar sistema...</p>
            </div>
        </div>
    );

}
