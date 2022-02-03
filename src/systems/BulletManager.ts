import { System } from '@ecs'
import { Bullet } from '@entities'
import { gameConfig } from '@configs'

export class BulletManager extends System {

    public update(_deltaTime: number): void {
        
        const bullets = this.engine.getEntities(Bullet)
        
        for (const bullet of bullets) {

            if (Date.now() - bullet.createdAt > gameConfig.bullet.lifetime) {
                this.engine.removeEntity(bullet)
            }
        }
    }
}