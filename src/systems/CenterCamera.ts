import { System } from "@ecs"
import { Position } from "@components"

export class CenterCamera extends System {

    public update(_deltaTime: number): void {

        const camera = this.engine.getEntitiesByTag('mainCamera')[0]!
        const playerPosition = this.engine.getEntitiesByTag('player')[0]!.getComponent(Position)!

        camera.getComponent(Position)!.x = playerPosition.x
        camera.getComponent(Position)!.y = playerPosition.y
    }

}