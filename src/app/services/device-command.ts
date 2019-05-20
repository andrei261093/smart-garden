import { ICommand } from './command';

export interface IDeviceCommand {
    pinId: number,
    command: ICommand
}