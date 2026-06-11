import {RichTableState} from "./types";
import {Table, TableBody, TableHead, TableCell, TableHeader, TableRow} from "../ui";
import {useReactTable, flexRender, getCoreRowModel} from "@tanstack/react-table";

export const TableUi = (props: RichTableState<any>) => {
    const table = useReactTable({
        columns: props.schema.columns,
        data: props.data,
        getCoreRowModel: getCoreRowModel()
    } as any)
    
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}