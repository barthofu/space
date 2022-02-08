import { System } from "@ecs"
import { Transform } from "@components"
import { getScaledPosition } from "@utils/functions"

export class CenterCamera extends System {

    public update(_deltaTime: number): void {

        const camera = engine.scene.getEntitiesByTag('mainCamera')[0]!,
              playerTransform = engine.scene.getEntitiesByTag('player')[0]!.getComponent(Transform)!,
              playerPosition = getScaledPosition(playerTransform.position)

        camera.getComponent(Transform)!.position.x = playerPosition.x
        camera.getComponent(Transform)!.position.y = playerPosition.y
    }

}