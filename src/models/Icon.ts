export interface Icon {
    label?: string;
    name: string;
    control: boolean;
    initialControl?: boolean;
    clickHandler?: () => void;
}