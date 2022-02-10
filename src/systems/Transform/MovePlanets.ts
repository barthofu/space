import { System } from '@ecs'
import { RotationAroundEntity, Transform } from '@components'
import { getAngularPosition } from '@utils/functions'

export class MoveEntitiesAround extends System {

    public update(_deltaTime: number): void {

        for (const entity of engine.scene.getAllEntities()) {

            if (entity.matchComponents([Transform, RotationAroundEntity], [])) {

                const transform = entity.getComponent(Transform)!,
                      rotationAroundEntity = entity.getComponent(RotationAroundEntity)!,
                      originEntityTransform = rotationAroundEntity.originEntity.getComponent(Transform)!

                const newPosition = getAngularPosition(
                    transform.position,
                    originEntityTransform.position,
                    rotationAroundEntity.speed * _deltaTime
                )

                transform.position.x = newPosition.x
                transform.position.y = newPosition.y
            }
        }
    }
}