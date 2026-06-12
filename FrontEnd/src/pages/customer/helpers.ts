import { CustomerStatus } from "./types";

export const mapStatusToVariantBadge = (status: CustomerStatus) => {
    switch (status) {
        case CustomerStatus.Active:
            return 'active'
        case CustomerStatus.Inactive:
            return 'default';
    }
}
