'use client'

import ListAppointment from "@/components/appointments/lists/pregnant/PregnantAppointmentsList";
import ProfessionalDashboard from "@/components/dashboard/professional/professional";
import { useState, useEffect } from "react";

const MOCK_USER = {
    role: "pregnant",
    name: "Pedro da Silva",
    email: "ana.beatriz@email.com",
    weeksPregnant: 24,
    nextAppointment: "2026-02-20",
    hospital: "Hospital Central de Maputo",
    specialty: "Obstetrícia",
    patientsCount: 38,
    licenseNumber: "MZ-OB-2024-0192",
};

export default function AppointmentRouter() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setUser(MOCK_USER);
            setLoading(false);
        }, 1400);
        return () => clearTimeout(t);
    }, []);

    if (user?.role === "pregnant") return <ListAppointment user={user} />;
    if (user?.role === "professional") return <ProfessionalDashboard user={user} />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d242b0] to-[#9534e8] text-white">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-sm">A carregar sistema...</p>
            </div>
        </div>
    );
}