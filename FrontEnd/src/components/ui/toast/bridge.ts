import { useToast } from "./provider";

export let toastApi: ReturnType<typeof useToast> | null = null;

export function ToastBridge() {
    toastApi = useToast();
    return null;
}
