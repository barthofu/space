import { Entity } from "@ecs"
import { Transform, PolygonRender, Collider, PhysicalBody } from "@components"
import { generateAsteroidShape } from "@utils/functions"
import { gameConfig } from "@configs"

export class Asteroid extends Entity {

    constructor(size: number, position: vector) {
        super()

        // convert size to radius
        const radius = size / 2

        this.addComponent(new Transform(position, 0, {x: 0, y: 0, rotation: .1}))
        this.addComponent(new Collider(radius))
        this.addComponent(new PhysicalBody())
        this.addComponent(
            new PolygonRender(
                generateAsteroidShape(30, radius * gameConfig.asteroid.radius.min, radius * gameConfig.asteroid.radius.max),
                { outline: 'white' },
            )
        )
    }
}