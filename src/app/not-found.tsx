'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function NotFound() {
    const router = useRouter();

    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#d242b0] to-[#9534e8] text-white px-4">


            <div className="text-center max-w-md flex flex-col items-center">


                <h1 className="text-6xl md:text-7xl font-bold mb-4 opacity-90">
                    404
                </h1>


                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    Página não encontrada
                </h2>


                <p className="text-sm md:text-base opacity-80 mb-8">
                    A página que procuras pode ter sido removida, renomeada
                    ou não está disponível no momento.
                </p>


                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#9534e8] text-sm md:text-base font-medium rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
                >
                    <ArrowLeft className="text-lg" />
                    Voltar
                </button>

            </div>


            <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10"></div>
            <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl bottom-10 right-10"></div>

        </div>
    )
}
