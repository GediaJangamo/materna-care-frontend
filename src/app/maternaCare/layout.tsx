"use client";

import { UserRole } from "@/enums/roles";
import PregnantLayout from "../layouts/pregnantLayout";
import { menuItemsByRole } from "@/config/menu";
import AdminLayout from "../layouts/adminLayout";
import ProfessionalLayout from "../layouts/professionalLayout";


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
