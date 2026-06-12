import { positionStyles, Toast, ToastPosition } from "./types";
import { useToast } from "./provider";
import { ToastComponent } from "./Toast";

export function ToastContainer() {
    const { toasts, removeToast } = useToast();

    const positions: ToastPosition[] = [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top-center",
        "bottom-center",
    ];

    return (
        <>
            {positions.map((position) => {
                const filtered = toasts.filter((t) => (t as any).position === position);

                if (!filtered.length) return null;

                return (
                    <div
                        key={position}
                        className={`fixed z-50 flex flex-col gap-2 ${positionStyles[position]}`}
                    >
                        {filtered.map((toast) => (
                            <ToastComponent
                                key={toast.id}
                                toast={toast}
                                onRemove={removeToast}
                            />
                        ))}
                    </div>
                );
            })}
        </>
    );
}
