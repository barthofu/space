import { System } from "@ecs"
import { Transform, ShapeRender } from "@components"
import { Particle } from "@entities"

import { gameConfig } from "@configs"
import { degreesToRadians, randomizeWithinRange, adjustAlpha } from "@utils/functions"

export class Thrust extends System {

    public update(_deltaTime: number): void {

        const particles = this.engine.getEntitiesByTag('thrust') as Particle[]

        for (const particle of particles) {

            this.removeOutdatedParticles(particle)
            this.lightenParticle(particle)
            
        }

        if (this.engine.input.isKeyDown('up')) this.createThrustParticle(1)
        else if (this.engine.input.isKeyDown('down')) this.createThrustParticle(-1)
    }

    private removeOutdatedParticles(particle: Particle): void {
            
        if (Date.now() - particle.createdAt > particle.lifetime) this.engine.removeEntity(particle)
    }

    private lightenParticle(particle: Particle): void {
    
        const shapeRender = particle.getComponent(ShapeRender)!
        shapeRender.color = adjustAlpha(shapeRender.color, -0.01)
    }

    private createThrustParticle(coeff: number): void {

        const spaceship = this.engine.getEntitiesByTag('player')[0]!,
              transform = spaceship.getComponent(Transform)!

        const spaceshipRotation = -degreesToRadians(transform.rotation),
              particleVelocity: velocity = {
                    x: gameConfig.thrust.particles.speed * Math.sin(spaceshipRotation) * coeff,
                    y: gameConfig.thrust.particles.speed * Math.cos(spaceshipRotation) * coeff,
                    rotation: 0
                },
              particlePosition: vector = {
                    x: transform.position.x + gameConfig.spaceship.size / 2 * Math.sin(spaceshipRotation),
                    y: transform.position.y + gameConfig.spaceship.size / 2 * Math.cos(spaceshipRotation)
                }

        const particle = new Particle({
            size: randomizeWithinRange(gameConfig.thrust.particles.size, 5),
            position: { ...particlePosition },
            velocity: particleVelocity,
            color: `rgba(255, 255, 255, ${randomizeWithinRange(0.5, 0.3)})`,
            lifetime: randomizeWithinRange(gameConfig.thrust.particles.lifetime, 200) * (coeff === 1 ? 1 : 0.4)
        })

        particle.tag = 'thrust'

        this.engine.addEntity(particle)
    }
}