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
}