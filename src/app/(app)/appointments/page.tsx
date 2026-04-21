'use client'

import Loader from "@/app/loading";
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

    if (loading) {
        return <Loader />;
    }

    if (user?.role === "pregnant") return <ListAppointment user={user} />;
    if (user?.role === "professional") return <ProfessionalDashboard user={user} />;

}