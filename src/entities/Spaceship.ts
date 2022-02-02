import { Entity } from '@ecs'
import {
    Position,
    Collider,
    ShapeRender,
    Health,
    Size,
    Controllable
} from '@components'
import { mapConfig } from '@configs'

export class Spaceship extends Entity {

    constructor() {
        super()

        this._components = [
            new Position(
                mapConfig.size.width / 2,    // x
                mapConfig.size.height / 2     // y
            ),
            new Size(30, 30),
            new Controllable(),
            new ShapeRender('triangle', 'red'),
            new Collider(),
            new Health(100)
        ]
    }
}