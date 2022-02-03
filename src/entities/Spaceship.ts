import { Entity } from '@ecs'
import {
    Transform,
    Collider,
    ShapeRender,
    Health,
    Controllable
} from '@components'
import { gameConfig, mapConfig } from '@configs'

export class Spaceship extends Entity {



    constructor() {
        super()

        this.tag = 'player'

        // Components 

        const size = gameConfig.spaceship.size
        const health = gameConfig.spaceship.health

        this.addComponent(new Transform({
            x: mapConfig.size.width / 2,
            y: mapConfig.size.height / 2
        }))
        this.addComponent(new Controllable())
        this.addComponent(new ShapeRender('triangle', 'red', [size, size]))
        this.addComponent(new Collider(size / 2))
        this.addComponent(new Health(health))
    }
}