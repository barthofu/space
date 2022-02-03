import { System } from '@ecs'
import { Bullet } from '@entities'
import { Transform } from '@components'
import { gameConfig } from '@configs'
import { degreesToRadians } from '@utils/functions'

export class ShootBullet extends System {

    public update(_deltaTime: number): void {
        
        if (this.engine.input.isKeyDown('shoot') && Date.now() - Bullet.lastCreated > gameConfig.bullet.delay) {

            const spaceship = this.engine.getEntitiesByTag('player')[0]!,
                  transform = spaceship.getComponent(Transform)!

            const bulletRotation = -degreesToRadians(transform.rotation),
                  bulletVelocity: velocity = {
                    x: gameConfig.bullet.speed * - Math.sin(bulletRotation),
                    y: gameConfig.bullet.speed * - Math.cos(bulletRotation),
                    rotation: 0
            }

            const bullet = new Bullet(
                gameConfig.bullet.size,
                { ...transform.position },
                bulletVelocity,
                gameConfig.bullet.color
            )

            this.engine.addEntity(bullet)
        }
    }
}