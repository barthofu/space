import { System } from "@ecs"
import { Transform } from "@components"

export class CenterCamera extends System {

    public update(_deltaTime: number): void {

        const camera = engine.scene.getEntitiesByTag('mainCamera')[0]!
        const playerTransform = engine.scene.getEntitiesByTag('player')[0]!.getComponent(Transform)!

        camera.getComponent(Transform)!.position.x = playerTransform.position.x
        camera.getComponent(Transform)!.position.y = playerTransform.position.y
    }

}