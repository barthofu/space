import { Planet, SolarSystem, Star } from '@entities'
import { Transform } from '@components'
import { System } from '@ecs'

import { drawCircle, getScaledPosition, getScaledRadius } from '@utils/functions'

export class DrawOrbits extends System {

    public update(_deltaTime: number): void {

        const solarSystems = engine.scene.getEntities(SolarSystem)

        for (const solarSystem of solarSystems) {

            const star = solarSystem.getEntities(Star)[0]!
            const starTransform = star.getComponent(Transform)!

            const planets = solarSystem.getEntities(Planet)

            for (const planet of planets) {

                const planetTransform = planet.getComponent(Transform)!

                const distance = Math.sqrt(Math.pow(starTransform.position.x - planetTransform.position.x, 2) + Math.pow(starTransform.position.y - planetTransform.position.y, 2))
            
                drawCircle({
                    position: getScaledPosition(starTransform.position),
                    radius: getScaledRadius(distance),
                    color: {
                        outline: '#ffffff',
                    }
                })
            }

        }
    }
}