export const BuffMap: { [key: number]: string } = {
    1: '道心破碎',
    2: '气血亏损',
    3: '闭关',
    4: '念头通达',
    5: '顿悟',
    6: '道果淬炼',
    7: '灵矿干涸',
    8: '发现新灵矿'
}

export enum BuffItem {
    '无事发生' = 0,
    '道心破碎' = 1,
    '气血亏损' = 2,
    '闭关' = 3,
    '念头通达' = 4,
    '顿悟' = 5,
    '道果淬炼' = 6,
    '灵矿干涸' = 7,
    '发现新灵矿' = 8,
}

export const BuffObject = [
    {
        id: 1,
        name: '道心破碎',
        description: '悟性-30'
    },
    {
        id: 2,
        name: '气血亏损',
        description: '根骨-30'
    },
    {
        id: 3,
        name: '闭关',
        description: '悟性+5'
    },
    {
        id: 4,
        name: '念头通达',
        description: '悟性+10'
    },
    {
        id: 5,
        name: '顿悟',
        description: '悟性+30'
    },
    {
        id: 6,
        name: '道果淬炼',
        description: '根骨+1'
    }
]