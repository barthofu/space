import { System } from "@ecs"
import { Transform, Controllable } from "@components"
import { gameConfig, physicsConfig } from '@configs'
import { degreesToRadians } from "@utils/functions"

export class ControlPlayer extends System {

    public update(_deltaTime: number): void {

        for (const entity of this.engine.entities) {

            if (entity.matchComponents([Transform, Controllable], [])) {

                const transform = entity.getComponent(Transform)!

                if (this.engine.input.isKeyDown('up')) this.applyLinearImpulse(gameConfig.thrust.speed.forward, transform, _deltaTime)
                if (this.engine.input.isKeyDown('down')) this.applyLinearImpulse(gameConfig.thrust.speed.backward, transform, _deltaTime)
                if (this.engine.input.isKeyDown('right')) this.applyAngularImpulse(1, transform, _deltaTime)
                if (this.engine.input.isKeyDown('left')) this.applyAngularImpulse(-1, transform, _deltaTime)

                this.applyLinearDeceleration(transform)
                this.applyAngularDeceleration(transform)

            }
        }
    }
    

    private applyLinearImpulse(thrust: number, transform: Transform, deltaTime: number): void {

        const angle = -degreesToRadians(transform.rotation)

        // apply thrust
        transform.velocity.x -= thrust * Math.sin(angle) * physicsConfig.speed.acceleration * deltaTime
        transform.velocity.y -= thrust * Math.cos(angle) * physicsConfig.speed.acceleration * deltaTime 
    }

    private applyAngularImpulse(coeff: number, transform: Transform, deltaTime: number): void {

        // apply angular impulse
        transform.velocity.rotation += coeff * physicsConfig.rotation.acceleration * deltaTime
    }

    private applyLinearDeceleration(transform: Transform): void {
            
        transform.velocity.x *= physicsConfig.speed.deceleration
        transform.velocity.y *= physicsConfig.speed.deceleration
    }

    private applyAngularDeceleration(transform: Transform): void {

        transform.velocity.rotation *= physicsConfig.rotation.deceleration
    }

}