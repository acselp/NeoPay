import type { PropsWithChildren } from "react";
import { Button, Card } from "../ui";
import { AlertTriangle, Plus } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function AdminPageWrapper(_props: PropsWithChildren) {
    return <>
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Utilities Setup</h1>
                    <p className="text-gray-500 mt-1">
                        Configure utility types, units, and reading rules
                    </p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Utility
                </Button>
            </div>

            {/* Warning banner */}
            <Card className="mb-6 bg-yellow-50 border-yellow-200">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-yellow-800">Admin Configuration</p>
                        <p className="text-sm text-yellow-700 mt-1">
                            Changes to utility settings affect validation and calculation rules
                            for all connections. Proceed with caution.
                        </p>
                    </div>
                </div>
            </Card>
            <Outlet />
        </div>
    </>
}
