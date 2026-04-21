"use client";

import { useEffect, useState } from "react";
import { UserRole } from "@/enums/roles";

import { menuItemsByRole } from "@/config/menu";
import PregnantLayout from "@/components/layouts/PregnantLayout";
import ProfessionalLayout from "@/components/layouts/ProfessionalLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import Loader from "../loading";

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
        return <Loader />;
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

}
