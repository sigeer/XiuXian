export const BuffMap: { [key: number]: string } = {
    1: '道心破碎',
    2: '气血亏损',
    3: '闭关',
    4: '念头通达',
    5: '顿悟',
    6: '道果淬炼'
}

export enum BuffItem {
    '道心破碎' = 1,
    '气血亏损' = 2,
    '闭关' = 3
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
    },
    {
        id: 7,
        name: '心魔缠身',
        description: '突破失败的死亡率增加'
    }
]