import { Toast, variantStyles } from "./types";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function ToastComponent({
                       toast,
                       onRemove,
                   }: {
    toast: Toast;
    onRemove: (id: string) => void;
}) {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosing(true);
            setTimeout(() => onRemove(toast.id), 200);
        }, toast.duration);

        return () => clearTimeout(timer);
    }, [toast.duration, toast.id, onRemove]);

    return (
        <div
            className={`
        pointer-events-auto
        flex items-start gap-3
        w-[340px]
        rounded-xl border px-3 py-2 shadow-lg
        transition-all
        duration-200
        ${variantStyles[toast.variant]}
        ${closing ? "animate-toast-out" : "animate-toast-in"}
      `}
        >
            <div className="flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description && (
                    <p className="text-xs opacity-70">{toast.description}</p>
                )}
            </div>

            <button
                onClick={() => {
                    setClosing(true);
                    setTimeout(() => onRemove(toast.id), 200);
                }}
                className="opacity-60 hover:opacity-100"
            >
                <X size={16} />
            </button>
        </div>
    );
}
