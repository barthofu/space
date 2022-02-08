import { Entity } from "@ecs"
import { Sun } from '@entities'
import { Transform, SpriteRender, Collider, PhysicalBody, RotationAroundEntity } from "@components"

type planetArg = { asset: string, position: vector, rotationSpeed?: number, size: number, sizeOffset?: number, sunRef: Sun }

export class Planet extends Entity {

    constructor({ asset, position, size, rotationSpeed = 1, sizeOffset = 0, sunRef }: planetArg) {
        super()

        // convert size to radius
        const radius = size / 2

        this.addComponent(new Transform(position, 0, {x: 0, y: 0, rotation: 1}))
        this.addComponent(new Collider(radius))
        this.addComponent(new PhysicalBody())
        this.addComponent(new SpriteRender(asset, { width: size, height: size }, { width: sizeOffset, height: sizeOffset }))
        this.addComponent(new RotationAroundEntity({ speed: rotationSpeed, originEntity: sunRef }))
    }
}