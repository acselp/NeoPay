import { NotesTabProps } from "../../types";
import { Card, CardTitle } from "../../../../components/ui";

export const NotesTab = ({ customer }: NotesTabProps) => {
    return (
        <Card>
            <CardTitle className="mb-4">Customer Notes</CardTitle>
            {customer?.Notes 
                ? (<p className="text-gray-700">{customer?.Notes}</p>) 
                : (<p className="text-gray-500 italic">No notes added for this customer.</p>)
            }
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    Customer since: { new Date(customer?.CreatedOn ?? new Date()).toLocaleDateString() }
                </p>
            </div>
        </Card>
    );
}
