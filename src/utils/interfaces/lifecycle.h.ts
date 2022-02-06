export interface IAwake {
    awake(): void
}

export interface IUpdate {
    update(_deltaTime: number): void
}