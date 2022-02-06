import { System } from '@ecs'
import { Bullet } from '@entities'

export class BulletManager extends System {

    public update(_deltaTime: number): void {
        
        const bullets = engine.scene.getEntities(Bullet)
        
        for (const bullet of bullets) {

            this.removeOutdatedBullet(bullet)
        }
    }

    public removeOutdatedBullet(bullet: Bullet): void {
            
        if (Date.now() - bullet.createdAt > bullet.lifetime) engine.scene.removeEntity(bullet)
    }
}