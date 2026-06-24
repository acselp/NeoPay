export interface Unit {
    Id: number;
    Code: string;
    LongName: string;
    Description?: string | null;
    Symbol: string;
}

export interface CreateUpdateProps {
    active: boolean;
    onClose: () => void;
    onSubmit?: (model: Unit) => void;
    model?: Unit | null;
}
