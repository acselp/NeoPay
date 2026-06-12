import { PaginationOptions } from "@tanstack/react-table";

export interface PaginationProps {
    pageSizeOptions: PaginationOptions;
    onNextClick?: () => void;
    onPreviousClick?: () => void;
}
