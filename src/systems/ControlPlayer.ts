import { Entity, System } from "@ecs"
import { Position, Controllable } from "@components"
import { controlsConfig } from '@configs'

export class ControlPlayer extends System {

    protected requiredComponents = [
        Position,
        Controllable
    ]

    public run(entity: Entity) {

        const position = entity.getComponent(Position)!

        position.x += (pressedKeys[controlsConfig.right]) ? 1 : 0
        position.x -= (pressedKeys[controlsConfig.left]) ? 1 : 0
        position.y += (pressedKeys[controlsConfig.down]) ? 1 : 0
        position.y -= (pressedKeys[controlsConfig.up]) ? 1 : 0
    }

}