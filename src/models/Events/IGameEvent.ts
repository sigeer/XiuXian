import { IBuff } from "../IBuff";

export interface IGameEvent {
    id: number;
    handle() :IBuff;
}