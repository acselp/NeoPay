import {renderTable} from "./strategies/table-factory";
import {RichTableProps} from "./types";

export const DataTable = (props: RichTableProps) => {
    return <> {renderTable(props)} </>
}