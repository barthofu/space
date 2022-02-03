import { System } from "@ecs"
import { Transform, Controllable } from "@components"
import { controlsConfig } from '@configs'

export class ControlPlayer extends System {

    public update(_deltaTime: number): void {

        for (const entity of this.engine.entities) {

            if (entity.matchComponents([Transform, Controllable], [])) {

                const transform = entity.getComponent(Transform)!

                this.moveEntity(transform)
                this.orientateEntity(transform)
            }
        }
    }

    public moveEntity(transform: Transform): void {

        transform.position.x += (pressedKeys[controlsConfig.right]) ? 1 : 0
        transform.position.x -= (pressedKeys[controlsConfig.left]) ? 1 : 0
        transform.position.y += (pressedKeys[controlsConfig.down]) ? 1 : 0
        transform.position.y -= (pressedKeys[controlsConfig.up]) ? 1 : 0
    }

    public orientateEntity(transform: Transform): void {

        transform.rotation += (pressedKeys[controlsConfig.rotateRight]) ? 1 : 0
        transform.rotation -= (pressedKeys[controlsConfig.rotateLeft]) ? 1 : 0
    }

}