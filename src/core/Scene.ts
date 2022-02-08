import { Entity, System } from '@ecs'

import { EntitiesManager } from '@utils/classes'
import { IAwake, IUpdate } from '@utils/interfaces'

export class Scene extends EntitiesManager implements IAwake, IUpdate {

    protected _name: string
    protected _size: size
    protected _systemsToLoad: System[] = []

    constructor(name: string) {
        super()
        this._name = name
    }

    public awake(): void {}
    public update(_deltaTime: number): void {}

    // Utils

    public loadSystems(): void { engine.systems = this._systemsToLoad }

    // Getters and Setters

    public get name(): string { return this._name }
    public set name(name: string) { this._name = name }

    public get size(): size { return this._size }
    public set size(size: size) { this._size = size }

}