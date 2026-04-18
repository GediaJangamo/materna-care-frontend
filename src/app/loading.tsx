export default function Loader() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#d242b0] to-[#9534e8]"
        >
            <div className="flex flex-col items-center gap-4">


                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>


                <p className="text-white text-sm md:text-base opacity-90">
                    Loading...
                </p>
            </div>
        </div>
    );
}
