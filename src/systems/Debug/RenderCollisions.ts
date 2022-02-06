import { System } from '@ecs'
import { Collider, Transform } from '@components'

import { drawCircle, worldToCanvasCoordinates } from '@utils/functions'
import { gameConfig } from '@configs'

export class RenderCollisions extends System {

    public update(_deltaTime: number): void {

        const camera = engine.scene.getEntitiesByTag('mainCamera')[0],
              cameraTransform = camera.getComponent(Transform)!

        for (const entity of engine.entities) {

            if (entity.matchComponents([Transform, Collider], [])) {
                
                const transform = entity.getComponent(Transform)!, 
                      collider = entity.getComponent(Collider)!

                drawCircle({
                    position: worldToCanvasCoordinates(transform.position, cameraTransform.position, gameConfig.window),
                    radius: collider.radius,
                    color: {
                        outline: 'white'
                    }
                })
            }
        }
    }
}