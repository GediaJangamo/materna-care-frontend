"use client";

import { UserRole } from "@/enums/roles";
import AdminDashboard from "@/components/dashboard/admin/admin";
import PregnantDashboard from "@/components/dashboard/pregnant/pregnant";
import ProfessionalDashboard from "@/components/dashboard/professional/professional";


export default function DashboardPage() {
    const user = "pregnant";

    if (user?.includes(UserRole.PREGNANT)) {
        return <PregnantDashboard />;
    }

    if (user?.includes(UserRole.PROFESSIONAL)) {
        return <ProfessionalDashboard />;
    }
    if (user?.includes(UserRole.ADMIN)) {
        return <AdminDashboard />;
    }

    return <p>Perfil não reconhecido</p>;
}
