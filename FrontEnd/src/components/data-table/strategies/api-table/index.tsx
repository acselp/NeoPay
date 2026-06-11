import {TableUi} from "../../table-ui";
import {useApiTable} from "./use-api-logic";
import {ApiTableStrategyProps} from "../../types";

export const ApiTableStrategy = (props: ApiTableStrategyProps) => {
    const logic = useApiTable(props)
    return <TableUi {...logic} />
}