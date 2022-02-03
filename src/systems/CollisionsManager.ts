import { System, Entity } from '@ecs'
import { Position, Collider } from '@components'
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
            if (entity.matchComponents([Position, Collider], [])) collidableEntities.push(entity)
        }

        return collidableEntities
    }

    public testCollision(entity: Entity, otherEntity: Entity): SAT.Response | null {

        const entityPosition = entity.getComponent(Position)!,
              entityCollider = entity.getComponent(Collider)!,

              otherEntityPosition = otherEntity.getComponent(Position)!,
              otherEntityCollider = otherEntity.getComponent(Collider)!,

              entityShape = new SAT.Circle(
                    new SAT.Vector(entityPosition.x, entityPosition.y), 
                    entityCollider.radius, 
                    entity.id
                ),
              otherEntityShape = new SAT.Circle(
                    new SAT.Vector(otherEntityPosition.x, otherEntityPosition.y), 
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
            entity.getComponent(Position)!.x -= collision.overlapV.x
            entity.getComponent(Position)!.y -= collision.overlapV.y
        }

    }



    // public update(deltaTime: number): void {
        
    //     const collisionsToTest = {
    //         player: null
    //     }

    //     // setup the collision system by adding all the collidable entities to it
    //     for (const entity of this.engine.entities) {
            
    //         if (entity.matchComponents([Position, Collider], [])) {
                
    //             const position = entity.getComponent(Position)!,
    //                   collider = entity.getComponent(Collider)!

    //             const circleCollider = new Circle(position.x, position.y, collider.radius)

    //             if (collisionsToTest[entity.getTag() as keyof typeof collisionsToTest]) {
    //                 collisionsToTest[entity.getTag() as keyof typeof collisionsToTest] = circleCollider
    //             }
            
    //             collisionSystem.insert(circleCollider)
    //         }
        
    //     }

    //     collisionSystem.update()

    //     // test for collisions
    //     for (const collisionToTest of Object.entries(collisionsToTest)) {

    //         const tag = collisionToTest[0]
    //         const collision = collisionToTest[1]

    //         if (collision) {
                
    //             const potentials = collision.potentials()

    //             for (const potential of potentials)
    //         }


    //     }

    // }



}