export interface IPin {
    id: number,
    state: boolean,
    last_change: string,
    expiration_time: number,
    numberOnDevice: number,
    description: string
}