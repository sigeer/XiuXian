export interface IBuff {
    id: number;
    expired: Date | null;

    extend(unit: number): void;
    setExpired(expired: Date | null): void;
}