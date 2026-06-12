export type ToastVariant =
    | "success"
    | "error"
    | "info"
    | "warning"
    | "neutral";

export type ToastPosition =
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";

export type Toast = {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
    duration: number;
};

export const variantStyles: Record<string, string> = {
    success: "bg-green-50 border-green-200 text-green-900",
    error: "bg-red-50 border-red-200 text-red-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    neutral: "bg-gray-50 border-gray-200 text-gray-900",
};

export const positionStyles: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};
