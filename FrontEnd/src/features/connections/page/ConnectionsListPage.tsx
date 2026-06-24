import { ConnectionsTable } from "../list/ConnectionsTable";

export default function ConnectionsListPage() {
    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Connections</h1>
                <p className="text-gray-500 mt-1">
                    Manage utility connections across all customers
                </p>
            </div>

            <ConnectionsTable />
        </div>
    );
}
