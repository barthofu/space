import { IUpdate, IAwake } from "@utils/interfaces"

export abstract class System implements IUpdate, IAwake {

    public awake(): void {}

    public abstract update(_deltaTime: number): void
}