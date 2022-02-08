import { System } from '@ecs'
import { RotationAroundEntity, Transform } from '@components'

export class MoveEntitiesAround extends System {

    public update(_deltaTime: number): void {

        for (const entity of engine.scene.getAllEntities()) {

            if (entity.matchComponents([Transform, RotationAroundEntity], [])) {

                const transform = entity.getComponent(Transform)!,
                      rotationAroundEntity = entity.getComponent(RotationAroundEntity)!,
                      originEntityTransform = rotationAroundEntity.originEntity.getComponent(Transform)!

                const angle = ( Math.PI / 180 ) * rotationAroundEntity.speed * _deltaTime,
                      deltaX = transform.position.x - originEntityTransform.position.x,
                      deltaY = transform.position.y - originEntityTransform.position.y

                transform.position.x = deltaX * Math.cos(angle) + deltaY * Math.sin(angle) + originEntityTransform.position.x
                transform.position.y = - deltaX * Math.sin(angle) + deltaY * Math.cos(angle) + originEntityTransform.position.y
            }
        }
    }

    // public update(_deltaTime: number): void {

    //     const suns = engine.scene.getEntities(Sun)

    //     for (const planet of engine.scene.getEntities(Planet)) {

    //         const transform = planet.getComponent(Transform)
    //         const closestSun = this.getClosestSun(transform, suns)

    //         if (closestSun) {

    //             const sunTransform = closestSun.getComponent(Transform)!

    //             let angle = 1 * _deltaTime
    //             angle *= Math.PI / 180

    //             const deltaX = transform.position.x - sunTransform.position.x
    //             const deltaY = transform.position.y - sunTransform.position.y

    //             transform.position.x = deltaX * Math.cos(angle) + deltaY * Math.sin(angle) + sunTransform.position.x
    //             transform.position.y = - deltaX * Math.sin(angle) + deltaY * Math.cos(angle) + sunTransform.position.y
    //         }
            
    //     }

    // }

    // private getClosestSun(transform: Transform, suns: Sun[]): Sun | null {

    //     let closestSun: Sun | null = null
    //     let closestDistance = Infinity

    //     for (const sun of suns) {

    //         const sunTransform = sun.getComponent(Transform)!
    //         const distance = distanceBetweenTwoPoints(transform.position, sunTransform.position)

    //         if (distance < closestDistance) {
    //             closestSun = sun
    //             closestDistance = distance
    //         }
    //     }

    //     return closestSun        
    // }
}