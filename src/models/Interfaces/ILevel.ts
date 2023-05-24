export interface ILevel {
    level: number;
    getLevelUpCost() : number;
    levelUp(): boolean;
}