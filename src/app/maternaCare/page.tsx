"use client";

import { UserRole } from "@/enums/roles";
import PregnantDashboard from "@/pages/dashboard/pregnant";
import ProfessionalDashboard from "@/pages/dashboard/professional";


export default function DashboardPage() {
    const user = "professional";

    if (user?.includes(UserRole.PREGNANT)) {
        return <PregnantDashboard />;
    }

    if (user?.includes(UserRole.PROFESSIONAL)) {
        return <ProfessionalDashboard />;
    }
    if (user?.includes(UserRole.ADMIN)) {
        // return <AdminDashboard />;
    }

    return <p>Perfil não reconhecido</p>;
}
