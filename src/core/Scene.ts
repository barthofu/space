import { Entity, System } from '@ecs'
import { IAwake, IUpdate } from '@utils/interfaces'

export class Scene implements IAwake, IUpdate {

    protected _name: string
    protected _entities: Entity[] = []
    protected _size: size
    protected _systemsToLoad: System[] = []

    constructor(name: string) {
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

    // Entities

    public get entities(): Entity[] { return this._entities }
    
    public addEntity(entity: Entity): void { this.entities.push(entity) }

    public removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity)
        if (index !== -1) {
            this.entities.splice(index, 1)
        }
    }

    public getEntitiesByTag(tag: string): Entity[] { return this.entities.filter(entity => entity.tag === tag) }

    public getEntityById(id: string): Entity | undefined { return this.entities.find(entity => entity.id === id) }

    public getEntities<C extends Entity>(constr: Class<C>): C[] { return this.entities.filter(entity => entity instanceof constr) as C[] }

}