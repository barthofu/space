import { Entity } from '@ecs'
import {
    Transform,
    Collider,
    PolygonRender,
    Health,
    Controllable
} from '@components'
import { gameConfig, mapConfig } from '@configs'
import { generateTriangleShape } from '@utils/functions'

export class Spaceship extends Entity {

    constructor() {
        super()

        this.tag = 'player'

        // Components 

        const size = gameConfig.spaceship.size,
              health = gameConfig.spaceship.health,
              position: vector = {
                x: mapConfig.size.width / 2,
                y: mapConfig.size.height / 2
              }

        this.addComponent(new Transform(position))
        this.addComponent(new Controllable())
        this.addComponent(new PolygonRender(generateTriangleShape({ x: size / 2.5, y: size / 2}), { outline: 'white' }))
        this.addComponent(new Collider(size / 2))
        this.addComponent(new Health(health))
    }
}