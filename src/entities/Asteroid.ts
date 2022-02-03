import { Position, Size, ShapeRender, Collider } from "@components"
import { Entity } from "@ecs"

export class Asteroid extends Entity {

    constructor(size: number, position: coordinates) {
        super()

        this._components = [
            new Position(
                position.x,
                position.y
            ),
            new ShapeRender('circle', 'white', [size / 2]),
            new Collider(size / 2)
        ]
    }
}