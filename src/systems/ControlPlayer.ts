import { System } from "@ecs"
import { Transform, Controllable } from "@components"
import { controlsConfig, physicsConfig } from '@configs'
import { degreesToRadians } from "@utils/functions"

export class ControlPlayer extends System {

    public update(_deltaTime: number): void {

        for (const entity of this.engine.entities) {

            if (entity.matchComponents([Transform, Controllable], [])) {

                const transform = entity.getComponent(Transform)!

                this.applyForwardImpulse(transform, _deltaTime)
                this.applyAngularImpulse(transform, _deltaTime)
            }
        }
    }

    public applyForwardImpulse(transform: Transform, deltaTime: number): void {

        const thrust = (pressedKeys[controlsConfig.up]) ? 1 : (pressedKeys[controlsConfig.down] ? -0.25 : 0),
              angle = -degreesToRadians(transform.rotation)

        // apply thrust
        transform.velocity.x -= thrust * Math.sin(angle) * physicsConfig.speed.acceleration * deltaTime
        transform.velocity.y -= thrust * Math.cos(angle) * physicsConfig.speed.acceleration * deltaTime 

        // apply natural deceleration
        transform.velocity.x *= physicsConfig.speed.deceleration
        transform.velocity.y *= physicsConfig.speed.deceleration
    }

    public applyAngularImpulse(transform: Transform, deltaTime: number): void {

        // apply angular impulse
        transform.velocity.rotation += 
            (pressedKeys[controlsConfig.right] ? physicsConfig.rotation.acceleration * deltaTime : 0) 
            - 
            (pressedKeys[controlsConfig.left] ? physicsConfig.rotation.acceleration * deltaTime : 0)
    
        // apply angular natural deceleration
        transform.velocity.rotation *= physicsConfig.rotation.deceleration
    }

}