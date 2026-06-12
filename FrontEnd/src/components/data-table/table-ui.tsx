import {RichTableState} from "./types";
import { Table, TableBody, TableHead, TableCell, TableHeader, TableRow, SearchInput, Button } from "../ui";
import {useReactTable, flexRender, getCoreRowModel, getPaginationRowModel} from "@tanstack/react-table";
import { LoadingOverlay } from "../ui/LoadingOverlay";

export const TableUi = (props: RichTableState<any>) => {
    const table = useReactTable({
        columns: props.schema.columns,
        data: props.data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: props.pagination.pageIndex,
                pageSize: props.pagination.pageSize,
            },
        },
    } as any)

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <SearchInput
                            value={props.search?.value}
                            onChange={(value) => { props.search?.onSearchChange?.(value) }}
                            placeholder="Search by customer, address, meter, or account..."
                        />
                    </div>
                </div>
            </div>
            {/* Results count */}
            <div className="text-sm text-gray-500 mb-4 flex justify-between">
                <div>
                    Showing {table.getRowModel().rows.length} of {props.pagination.totalItems} readings
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <Table className="relative">
                    {props.isLoading ? <LoadingOverlay /> : '' }
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
                            <TableRow
                                key={row.id}
                                onClick={() => props.schema?.table?.row?.onRowClick?.(row.original)}
                                className="cursor-pointer"
                            >
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
                                <TableCell className="col-span-5" colSpan={props.schema.columns.length}>
                                    <div className="text-center py-9">
                                        No records found.
                                    </div>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
            {/* Results count */}
            <div className="text-sm text-gray-500 mt-4 flex justify-between">
                <div>
                    Showing {table.getRowModel().rows.length} of {props.pagination.totalItems} readings
                </div>
            </div>
        </>
    )
}
