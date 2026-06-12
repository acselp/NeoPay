import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useCallback,
} from "react";
import { Toast, ToastVariant } from "./types";

type ToastContextValue = {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => string;
    removeToast: (id: string) => void;
    clear: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { toasts: [] });

    const removeToast = useCallback((id: string) => {
        dispatch({ type: "REMOVE", id });
    }, []);

    const addToast = useCallback(
        (toast: Omit<Toast, "id">) => {
            const id = crypto.randomUUID();

            dispatch({
                type: "ADD",
                toast: {
                    id,
                    duration: 3000,
                    ...toast,
                },
            });

            return id;
        },
        []
    );

    const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

    return (
        <ToastContext.Provider
            value={ {
                toasts: state.toasts,
                addToast,
                removeToast,
                clear,
            } }
        >
            { children }
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
}

type ToastState = {
    toasts: Toast[];
};

type Action =
    | { type: "ADD"; toast: Toast }
    | { type: "REMOVE"; id: string }
    | { type: "CLEAR" };

function reducer(state: ToastState, action: Action): ToastState {
    switch (action.type) {
        case "ADD":
            return { toasts: [action.toast, ...state.toasts] };

        case "REMOVE":
            return {
                toasts: state.toasts.filter((t) => t.id !== action.id),
            };

        case "CLEAR":
            return { toasts: [] };

        default:
            return state;
    }
}
