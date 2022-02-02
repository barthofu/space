import { IAwake, IUpdate } from "@interfaces/lifecycle/lifecycle.h"
import { Entity } from './Entity'

export abstract class Component implements IUpdate, IAwake {

    public entity: Entity | null
    public name: string

    public awake(): void {}

    public update(deltaTime: number): void {}
}