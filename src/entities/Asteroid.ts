import { Position, Size, ShapeRender, Collider } from "@components"
import { Entity } from "@ecs"

export class Asteroid extends Entity {

    constructor() {
        super()

        this._components = [
            new Position(
                5400,
                4800
            ),
            new Size(
                100,
                100
            ),
            new ShapeRender('circle', 'white'),
            new Collider()
        ]
    }
}