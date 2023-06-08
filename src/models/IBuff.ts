export interface IBuff {
    id: number;
    duration: number | null;
    expired: number|null;

    extend(unit: number): void;
    setDuration(expired: number | null): void;
    get Name(): string;

    HasExpired(): boolean;
}