import { Transform, ShapeRender, Collider } from "@components"
import { Entity } from "@ecs"

export class Asteroid extends Entity {

    constructor(size: number, position: vector) {
        super()

        this._components = [
            new Transform(position),
            new ShapeRender('circle', 'white', [size / 2]),
            new Collider(size / 2)
        ]
    }
}