export default function Loader() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="w-full h-screen flex items-center justify-center bg-white"
        >
            <div className="flex gap-2">
                <span className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-bounce"></span>
            </div>
        </div>
    );
}

