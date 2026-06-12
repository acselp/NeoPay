export const LoadingOverlay = () => {
    return (
        <tbody className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-opacity duration-200">
            <tr className="h-16 w-16 rounded-full border-4 border-white/20 border-t-white animate-spin"></tr>
        </tbody>
    )
}
