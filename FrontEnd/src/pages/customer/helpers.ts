export const mapStatusToVariantBadge = (status: number) => {
    switch (status) {
        case 0:
            return 'active'
        case 1:
            return 'default';
            
        default:
            return 'default';
    }
}
