export interface IShouHuo {
    product() : void;
    consume(): boolean;
    get BaseValueOfProduction(): number;
    get ValueOfProduction(): number;
    get ValueOfConsumption(): number;
}