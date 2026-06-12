import { ConnectionsTab } from "./Connections";
import { ReadingsTab } from "./Readings";
import { NotesTab } from "./Notes";
import { Customer } from "../../types";


export const GetTabs = ({ customer }: { customer: Customer }) => {
    return [
        // {
        //     id: 'connections',
        //     label: 'Connections',
        //     count: connections.length,
        //     content: (
        //         <ConnectionsTab
        //             connections={connections}
        //             customerId={customerId}
        //             navigate={navigate}
        //         />
        //     ),
        // },
        // {
        //     id: 'readings',
        //     label: 'Readings',
        //     count: customerReadings.length,
        //     content: <ReadingsTab readings={customerReadings} />,
        // },
        {
            id: 'notes',
            label: 'Notes',
            content: <NotesTab customer={customer} />,
        },
    ];
}
