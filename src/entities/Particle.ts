import { Entity } from '@ecs'
import { Transform, CircleRender } from '@components'

export class Particle extends Entity {

    public createdAt: number = Date.now()
    public lifetime: number

    constructor({size, position, velocity = { x: 0, y: 0, rotation: 0}, color = 'white', lifetime = 100}: particleArgs) {
        super()

        // convert size to radius
        const radius = size / 2

        this.lifetime = lifetime
        this.addComponent(new Transform(
            position,
            0,
            velocity,
        ))
        this.addComponent(new CircleRender(radius, { fill: color }))
    }
}