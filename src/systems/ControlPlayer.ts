import { System } from "@ecs"
import { Position, Controllable } from "@components"
import { controlsConfig } from '@configs'

export class ControlPlayer extends System {

    public update(_deltaTime: number): void {

        for (const entity of this.engine.entities) {

            if (entity.matchComponents([Position, Controllable], [])) {

                const position = entity.getComponent(Position)!

                position.x += (pressedKeys[controlsConfig.right]) ? 1 : 0
                position.x -= (pressedKeys[controlsConfig.left]) ? 1 : 0
                position.y += (pressedKeys[controlsConfig.down]) ? 1 : 0
                position.y -= (pressedKeys[controlsConfig.up]) ? 1 : 0

                if (pressedKeys[controlsConfig.debug]) {
                    console.log(this.engine)
                }
            }
        }
    }

}