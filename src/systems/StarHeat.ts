import { System } from '@ecs'
import { SolarSystem, Star, Background } from '@entities'
import { Transform, Health, PolygonRender, Collider } from '@components'
import { distanceBetweenTwoPoints } from '@utils/functions'
import { gameConfig } from '@configs'

export class StarHeat extends System {

    public update(_deltaTime: number): void {

        const player = engine.scene.getEntitiesByTag('player')[0]!,
              playerTransform = player.getComponent(Transform)!

        const solarSystems = engine.scene.getEntities(SolarSystem)

        for (const solarSystem of solarSystems) {

            const star = solarSystem.getEntities(Star)[0]!,
                  starTransform = star.getComponent(Transform)!,
                  starCollider = star.getComponent(Collider)!

            const distance = distanceBetweenTwoPoints(playerTransform.position, starTransform.position) - starCollider.radius

            if (distance < gameConfig.star.heat.distance) {
            
                this.starHeatDamages(player, distance, _deltaTime)
                this.visualEffect(distance)
            }
        }
    }

    private starHeatDamages(player: any, distance: number, deltaTime: number): void {

        const distanceRatio = 1 - (distance / gameConfig.star.heat.distance),
              damages = gameConfig.star.heat.damages * distanceRatio * deltaTime

        player.getComponent(Health)!.health -= damages
    }

    private visualEffect(distance: number): void {

        const background = engine.scene.getEntities(Background)[0]!,
              backgroundRender = background.getComponent(PolygonRender)!
        
        backgroundRender.fill = `rgb(${80 * (1 - (distance / gameConfig.star.heat.distance))}, 0, 0)`
    }
}