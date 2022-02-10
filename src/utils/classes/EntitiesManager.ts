import { Entity } from '@ecs'

export class EntitiesManager {

    protected _entities: Entity[] = []

    get entities(): Entity[] { return this._entities }
    
    public addEntity(entity: Entity): void { 
        this.entities.push(entity) 
    }

    public removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity)
        if (index !== -1) {
            this.entities.splice(index, 1)
        }
    }

    public getEntitiesByTag(tag: string): Entity[] { return this.getAllEntities().filter(entity => entity.tag === tag) }

    public getEntityById(id: string): Entity | undefined { return this.getAllEntities().find(entity => entity.id === id) }

    public getEntities<C extends Entity>(constr: Class<C>): C[] { return this.getAllEntities().filter(entity => entity instanceof constr) as C[] }

    public getAllEntities(): Entity[] { 

        if (this.entities.length === 0) return []

        return this.entities.concat(
            this.entities.flatMap(entity => entity.getAllEntities())
        )
    }
}