import { System } from '@ecs'
import { Collider, Transform } from '@components'

import { drawCircle, getScaledPosition, getScaledRadius, worldToCanvasCoordinates } from '@utils/functions'
import { gameConfig } from '@configs'

export class RenderCollisions extends System {

    public update(_deltaTime: number): void {

        const camera = engine.scene.getEntitiesByTag('mainCamera')[0],
              cameraTransform = camera.getComponent(Transform)!

        for (const entity of engine.scene.getAllEntities()) {

            if (entity.matchComponents([Transform, Collider], [])) {
                
                const transform = entity.getComponent(Transform)!, 
                      collider = entity.getComponent(Collider)!

                const position = getScaledPosition(transform.position),
                      cameraPosition = getScaledPosition(cameraTransform.position)

                drawCircle({
                    position: worldToCanvasCoordinates(position, cameraTransform.position, gameConfig.window),
                    radius: getScaledRadius(collider.radius),
                    color: {
                        outline: 'red'
                    }
                })
            }
        }
    }
}