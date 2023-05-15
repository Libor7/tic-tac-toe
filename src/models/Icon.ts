export interface Icon {
    name: string;
    control: boolean;
    initialControl?: boolean;
    clickHandler?: () => void;
}