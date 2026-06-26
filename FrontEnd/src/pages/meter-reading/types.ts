import { Unit } from "../unit/types";

export interface MeterReadingListModel {
    Id: number;
    MeterSerialNumber: string;
    Value: number;
    CustomerName: string;
    UtilityName: string;
    FormatedDate: string;
}

export interface MeterReadingCreateModel {
    MeterId: number;
    Value: number;
}

export interface CreateUpdateProps {
    active: boolean;
    onClose: () => void;
    onSubmit?: (model: MeterReadingCreateModel) => void;
    model?: MeterReadingCreateModel | null;
}
