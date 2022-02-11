import { System } from '@ecs'
import { SolarSystem, Sun, Background } from '@entities'
import { Transform, Health, PolygonRender, Collider } from '@components'
import { distanceBetweenTwoPoints } from '@utils/functions'
import { gameConfig } from '@configs'

export class SunHeat extends System {

    public update(_deltaTime: number): void {

        const player = engine.scene.getEntitiesByTag('player')[0]!,
              playerTransform = player.getComponent(Transform)!

        const solarSystems = engine.scene.getEntities(SolarSystem)

        for (const solarSystem of solarSystems) {

            const sun = solarSystem.getEntities(Sun)[0]!,
                  sunTransform = sun.getComponent(Transform)!,
                  sunCollider = sun.getComponent(Collider)!

            const distance = distanceBetweenTwoPoints(playerTransform.position, sunTransform.position) - sunCollider.radius

            if (distance < gameConfig.sun.heat.distance) {
            
                this.sunHeatDamages(player, distance, _deltaTime)
                this.visualEffect(distance)
            }
        }
    }

    private sunHeatDamages(player: any, distance: number, deltaTime: number): void {

        const distanceRatio = 1 - (distance / gameConfig.sun.heat.distance),
              damages = gameConfig.sun.heat.damages * distanceRatio * deltaTime

        player.getComponent(Health)!.health -= damages
    }

    private visualEffect(distance: number): void {

        const background = engine.scene.getEntities(Background)[0]!,
              backgroundRender = background.getComponent(PolygonRender)!
        
        backgroundRender.fill = `rgb(${80 * (1 - (distance / gameConfig.sun.heat.distance))}, 0, 0)`
    }
}