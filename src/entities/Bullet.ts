import { Entity } from '@ecs'
import { Transform, ShapeRender, Collider } from '@components'

export class Bullet extends Entity {

    public static lastCreated: number = Date.now()

    public createdAt: number = Date.now()

    constructor(size: number, position: vector, velocity: velocity, color: string = 'red') {
        super()

        Bullet.lastCreated = Date.now()

        this.addComponent(new Transform(
            position,
            0,
            velocity,
        ))
        this.addComponent(new Collider(size / 2))
        this.addComponent(new ShapeRender('circle', color, [size / 2]))
    }

}