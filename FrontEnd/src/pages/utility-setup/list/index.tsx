import { Plus } from "lucide-react";
import { Button } from "../../../components/ui";
import { DataTable } from "../../../components/data-table/data-table";
import { GetSchema } from "./schema";
import { useMemo, useState } from "react";
import { CreateUpdate } from "../create-update/CreateUpdate";
import { UtilityModel } from "../types";
import { UtilityService } from "../../../services/utility/utility-service";

export default function UtilitiesList() {
    const schema = useMemo(() => GetSchema(), []);
    const [isCreateUpdateOpen, setIsCreateModalOpen] = useState<boolean>(false);

    const onCreate = (model: UtilityModel) => {
        UtilityService.create(model);
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Utilities Setup</h1>
                    <p className="text-gray-500 mt-1">
                        Configure utility types, units, and reading rules
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Utility
                </Button>
            </div>

            <CreateUpdate 
                onClose={() => setIsCreateModalOpen(false)} 
                active={isCreateUpdateOpen}
                onSubmit={onCreate}
            />

            <DataTable {...schema} />
        </div>
    )
}
