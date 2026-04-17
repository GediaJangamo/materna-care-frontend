"use client";

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

    const onlineUser = "pregnant";

    if (onlineUser?.includes(UserRole.PREGNANT)) {
        return (
            <PregnantLayout menu={menuItemsByRole.pregnant}>{children}</PregnantLayout>
        );
    }

    if (onlineUser?.includes(UserRole.PROFESSIONAL)) {
        return (
            <ProfessionalLayout menu={menuItemsByRole.professional}>{children}</ProfessionalLayout>
        );
    }
    if (onlineUser?.includes(UserRole.ADMIN)) {
        return (
            <AdminLayout menu={menuItemsByRole.admin}>{children}</AdminLayout>
        );
    }

    return <p>Acesso não autorizado. Contacte o administrador</p>;
}
