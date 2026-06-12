export function debounce(
    callback: any,
    delay: number
) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return () => {
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback();
        }, delay);
    };
}
