import { Entity } from "@ecs"
import { Transform, SpriteRender, Collider, PhysicalBody } from "@components"
import { gameConfig } from "@configs"

export class Planet extends Entity {

    constructor(asset: string, position: vector, size: number, sizeOffset: number = 0) {
        super()

        // convert size to radius
        const radius = size / 2

        this.addComponent(new Transform(position, 0, {x: 0, y: 0, rotation: 0}))
        this.addComponent(new Collider(radius))
        this.addComponent(new PhysicalBody())
        this.addComponent(new SpriteRender(asset, { width: size, height: size }, { width: sizeOffset, height: sizeOffset }))
    }
}