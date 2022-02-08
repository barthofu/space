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
import { Vector } from 'sat'

export class Spaceship extends Entity {

    constructor({ position, size, health, color }: { position: vector, size: number, health: number, color: color}) {
        super()

        this.tag = 'player'

        this.addComponent(new Transform(position))
        this.addComponent(new Controllable())
        this.addComponent(new PolygonRender(generateTriangleShape({ x: size / 2.5, y: size / 2}), color))
        this.addComponent(new Collider(size / 2))
        this.addComponent(new Health(health))
    }
}