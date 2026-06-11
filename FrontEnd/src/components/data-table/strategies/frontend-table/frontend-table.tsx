import {FrontendStrategyProps} from "../../types";
import {TableUi} from "../../table-ui";
import {useFrontendTable} from "./use-frontend-table";

export const FrontendTableStrategy = (props: FrontendStrategyProps<any>) => {
    const logic = useFrontendTable(props)
    return <TableUi {...logic} />
}