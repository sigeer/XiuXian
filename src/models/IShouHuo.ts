export interface IShouHuo {
    flag: number;
    product() : void;
    consume(): boolean;
    get BaseValueOfProduction(): number;
    get ValueOfProduction(): number;
    get ValueOfConsumption(): number;
}