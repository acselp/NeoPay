import {RichTableProps, TableStrategy} from "../types";
import {ApiTableStrategy} from "./api-table";
import {FrontendTableStrategy} from "./frontend-table/frontend-table";

export const renderTable = (props: RichTableProps) => {
    const { mode } = props;
    switch (mode) {
        case TableStrategy.Api:
            return <ApiTableStrategy {...props} />
        
        case TableStrategy.Frontend:
            return <FrontendTableStrategy {...props} />

        default:
            throw new Error(`Unknown strategy: ${mode}`)
    }
}