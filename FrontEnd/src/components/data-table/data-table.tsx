import {renderTable} from "./strategies/table-factory";
import {RichTableProps} from "./types";

export const DataTable = <T,>(props: RichTableProps<T>) => {
    return <> {renderTable(props)} </>
}