import { System, Entity } from '@ecs'
import { Transform, Collider } from '@components'
import { physicsConfig } from '@configs'
import SAT from 'sat'

export class CollisionsManager extends System {

    public awake() {}

    public update(_deltaTime: number): void {        

        const collidableEntities = this.collectCollidableEntities(),
              collisions: SAT.Response[] = []

        for (const entity of collidableEntities) {

            for (const otherEntity of collidableEntities) {

                if (otherEntity.id === entity.id) continue

                const result = this.testCollision(entity, otherEntity)
                if (result) collisions.push(result)
            }
        }

        for (const collision of collisions) {
            this.handleCollision(collision)
        }

    }


    public collectCollidableEntities(): Entity[] {

        const collidableEntities: Entity[] = []

        for (const entity of this.engine.entities) {
            if (entity.matchComponents([Transform, Collider], [])) collidableEntities.push(entity)
        }

        return collidableEntities
    }

    public testCollision(entity: Entity, otherEntity: Entity): SAT.Response | null {

        const entityTransform = entity.getComponent(Transform)!,
              entityCollider = entity.getComponent(Collider)!,

              otherEntityTransform = otherEntity.getComponent(Transform)!,
              otherEntityCollider = otherEntity.getComponent(Collider)!,

              entityShape = new SAT.Circle(
                    new SAT.Vector(entityTransform.position.x, entityTransform.position.y), 
                    entityCollider.radius, 
                    entity.id
                ),
              otherEntityShape = new SAT.Circle(
                    new SAT.Vector(otherEntityTransform.position.x, otherEntityTransform.position.y), 
                    otherEntityCollider.radius, 
                    otherEntity.id
                )

        const response = new SAT.Response()
        
        if (SAT.testCircleCircle(entityShape, otherEntityShape, response)) return response
        else return null
    }


    public handleCollision(collision: SAT.Response) {

        const entity = this.engine.getEntityById(collision.a.entityId)!,
              otherEntity = this.engine.getEntityById(collision.b.entityId)!

        if (entity.tag === 'player') {
            // entity.getComponent(Transform)!.position.x -= collision.overlapV.x
            // entity.getComponent(Transform)!.position.y -= collision.overlapV.y
            entity.getComponent(Transform)!.velocity.x = - entity.getComponent(Transform)!.velocity.x * physicsConfig.collisions.knockbackStrength
            entity.getComponent(Transform)!.velocity.y = - entity.getComponent(Transform)!.velocity.y * physicsConfig.collisions.knockbackStrength
        }

    }

}