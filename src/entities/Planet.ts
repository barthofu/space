import { Entity } from "@ecs"
import { Star } from '@entities'
import { Transform, SpriteRender, Collider, PhysicalBody, RotationAroundEntity } from "@components"

type planetArg = { asset: string, position: vector, rotationSpeed?: number, size: number, sizeOffset?: number, starRef: Star }

export class Planet extends Entity {

    constructor({ asset, position, size, rotationSpeed = 1, sizeOffset = 0, starRef }: planetArg) {
        super()

        // convert size to radius
        const radius = size / 2

        this.addComponent(new Transform(position, 0, {x: 0, y: 0, rotation: 3 / size }))
        this.addComponent(new Collider(radius))
        this.addComponent(new PhysicalBody())
        this.addComponent(new SpriteRender(asset, { width: size, height: size }, { width: sizeOffset, height: sizeOffset }))
        this.addComponent(new RotationAroundEntity({ speed: rotationSpeed, originEntity: starRef }))
    }
}