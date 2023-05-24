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

export function getItemTypeById(id: number) {
    if (id >= 9 && id <= 15)
        return 3;
    if (id >= 16 && id <= 22)
        return 4;
    if (id >= 23 && id <= 29)
        return 5;
    return 2;
}

export function getCost(id: number) {
    return (id - 7) % 7;
}