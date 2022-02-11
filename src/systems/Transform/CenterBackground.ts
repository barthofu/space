import { System } from "@ecs"
import { Background } from "@entities"
import { Transform } from "@components"

export class CenterBackground extends System {

    public update(_deltaTime: number): void {

        const background = engine.scene.getEntities(Background)[0]!,
              playerTransform = engine.scene.getEntitiesByTag('player')[0]!.getComponent(Transform)!,
              playerPosition = playerTransform.position

        background.getComponent(Transform)!.position.x = playerPosition.x
        background.getComponent(Transform)!.position.y = playerPosition.y
    }

}