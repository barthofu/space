import { Entity } from '@ecs'
import {
    Transform,
    Collider,
    PhysicalBody,
    SpriteRender
} from '@components'
import { gameConfig } from '@configs'

export class Sun extends Entity {

    constructor({ position, size }: { position: vector, size: number }) {
        super()

        this.addComponent(new Transform(position))
        this.addComponent(new Collider(size / 2))
        this.addComponent(new PhysicalBody())
        this.addComponent(new SpriteRender('sun.png', { width: size, height: size }, { width: gameConfig.sun.sizeOffset, height: gameConfig.sun.sizeOffset }))
    }

}