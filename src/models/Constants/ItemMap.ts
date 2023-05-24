export const ItemMap: { [key: number]: string } = {
    0: '经验',
    1: '灵石',
    2: '药草（练气）',
    3: '药草（筑基）',
    4: '药草（金丹）',
    5: '药草（元婴）',
    6: '药草（化神）',
    7: '药草（返虚）',
    8: '药草（渡劫）',
    9: '还魂丹(练气)',
    10: '还魂丹(筑基)',
    11: '还魂丹(金丹)',
    12: '还魂丹(元婴)',
    13: '还魂丹(化神)',
    14: '还魂丹(返虚)',
    15: '还魂丹(渡劫)',
    16: '经验丹(练气)',
    17: '经验丹(筑基)',
    18: '经验丹(金丹)',
    19: '经验丹(元婴)',
    20: '经验丹(化神)',
    21: '经验丹(返虚)',
    22: '经验丹(渡劫)',
    23: '突破丹(练气)',
    24: '突破丹(筑基)',
    25: '突破丹(金丹)',
    26: '突破丹(元婴)',
    27: '突破丹(化神)',
    28: '突破丹(返虚)',
    29: '突破丹(渡劫)',
}

export function findMedicineForLevel(level: number) {
    if (level <= 12)
        return 9;
    if (level <= 15)
        return 10;
    if (level <= 18)
        return 11;
    if (level <= 21)
        return 12;
    if (level <= 24)
        return 13;
    if (level <= 27)
        return 14;
    return 15;
}

export enum ItemType {
    Exp = 1,
    LingShi = 2,
    Herbs = 3,
    ExpDrug = 4,
    TuPoDrug = 5,
    ReviveDrug = 6
}

export function getItemTypeById(id: number) {
    if (id >= 9 && id <= 15)
        return ItemType.ReviveDrug;
    if (id >= 16 && id <= 22)
        return ItemType.ExpDrug;
    if (id >= 23 && id <= 29)
        return ItemType.TuPoDrug;
    return ItemType.LingShi;
}

export function getCost(id: number) {
    return (id - 7) % 7;
}

export function getTuPoDrugForLevel(level: number) {
    if (level <= 12)
        return 23;
    if (level <= 15)
        return 24;
    if (level <= 18)
        return 25;
    if (level <= 21)
        return 26;
    if (level <= 24)
        return 27;
    if (level <= 30)
        return 28;
    return 29;
}

export function getExpDrugForLevel(level: number) {
    if (level <= 12)
        return 16;
    if (level <= 15)
        return 17;
    if (level <= 18)
        return 18;
    if (level <= 21)
        return 19;
    if (level <= 24)
        return 20;
    if (level <= 30)
        return 21;
    return 22;
}