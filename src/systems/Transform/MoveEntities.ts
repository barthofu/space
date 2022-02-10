import { System } from '@ecs'
import { Transform } from '@components'

export class MoveEntities extends System {

    public update(_deltaTime: number): void {

        for (const entity of engine.scene.getAllEntities()) {

            if (entity.matchComponents([Transform], [])) {

                const transform = entity.getComponent(Transform)!

                this.moveEntityWithVelocity(transform)
                this.rotateEntityWithVelocity(transform)
            }
        }
    }

    private moveEntityWithVelocity(transform: Transform): void {

        transform.position.x += transform.velocity.x / engine.config.scale
        transform.position.y += transform.velocity.y / engine.config.scale
    }

    private rotateEntityWithVelocity(transform: Transform): void {
            
        transform.rotation += transform.velocity.rotation
    }
}