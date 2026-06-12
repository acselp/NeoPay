import { ToastVariant } from "./types";
import { toastApi } from "./bridge";

function baseToast(
    title: string,
    variant: ToastVariant,
    description?: string
) {
    if (!toastApi) throw new Error("ToastProvider not mounted");

    return toastApi.addToast({
        title,
        description,
        variant,
        duration: 3000,
    });
}

export const toast = {
    success: (t: string, d?: string) => baseToast(t, "success", d),
    error: (t: string, d?: string) => baseToast(t, "error", d),
    info: (t: string, d?: string) => baseToast(t, "info", d),
    warning: (t: string, d?: string) => baseToast(t, "warning", d),
};
