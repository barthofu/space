import { Entity } from '@ecs'
import { Transform, ShapeRender } from '@components'

export class Particle extends Entity {

    public createdAt: number = Date.now()
    public lifetime: number

    constructor({size, position, velocity = { x: 0, y: 0, rotation: 0}, color = 'white', lifetime = 100}: particleArgs) {
        super()

        this.lifetime = lifetime
        
        this.addComponent(new Transform(
            position,
            0,
            velocity,
        ))
        this.addComponent(new ShapeRender('circle', color, [size / 2]))
    }
}