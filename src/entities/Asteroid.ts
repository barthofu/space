import { Transform, ShapeRender, Collider, PhysicalBody } from "@components"
import { Entity } from "@ecs"

export class Asteroid extends Entity {

    constructor(size: number, position: vector) {
        super()

        this.addComponent(new Transform(position))
        this.addComponent(new Collider(size / 2))
        this.addComponent(new PhysicalBody())
        this.addComponent(new ShapeRender('circle', 'white', [size / 2]))
    }
}