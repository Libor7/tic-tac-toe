export interface Icon {
    label?: string;
    name: string;
    control: boolean;
    initialControl?: boolean;
    clickHandler?: () => void;
}

export interface Mark {
    label: string;
    name: string;
}
