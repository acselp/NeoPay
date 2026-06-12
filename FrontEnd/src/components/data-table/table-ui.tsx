import {RichTableState} from "./types";
import {Table, TableBody, TableHead, TableCell, TableHeader, TableRow} from "../ui";
import {useReactTable, flexRender, getCoreRowModel} from "@tanstack/react-table";
import { Loading } from "../ui/Loading";

export const TableUi = (props: RichTableState<any>) => {
    const table = useReactTable({
        columns: props.schema.columns,
        data: props.data,
        getCoreRowModel: getCoreRowModel()
    } as any)

    return (
        <>
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
                    {table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row) => (
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
                    ))
                    :
                        <TableRow>
                            <TableCell className="col-span-5" colSpan="5">
                                <div className="text-center py-9">
                                    { props.isLoading
                                        ? <Loading />
                                        : "No records found."
                                    }
                                </div>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </>
    )
}
