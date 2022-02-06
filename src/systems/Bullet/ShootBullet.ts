import { System } from '@ecs'
import { Bullet } from '@entities'
import { Transform } from '@components'
import { gameConfig } from '@configs'
import { degreesToRadians } from '@utils/functions'

export class ShootBullet extends System {

    public update(_deltaTime: number): void {
        
        if (engine.input.isKeyDown('shoot') && Date.now() - Bullet.lastCreated > gameConfig.bullet.delay) {

            const spaceship = engine.scene.getEntitiesByTag('player')[0]!,
                  transform = spaceship.getComponent(Transform)!

            const spaceshipRotation = -degreesToRadians(transform.rotation),
                  bulletVelocity: velocity = {
                    x: gameConfig.bullet.speed * - Math.sin(spaceshipRotation),
                    y: gameConfig.bullet.speed * - Math.cos(spaceshipRotation),
                    rotation: 0
                }

            const bullet = new Bullet({
                size: gameConfig.bullet.size,
                position: { ...transform.position },
                velocity: bulletVelocity,
                color: gameConfig.bullet.color,
                lifetime: gameConfig.bullet.lifetime
            })

            engine.scene.addEntity(bullet)
        }
    }
}