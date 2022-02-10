import { Entity, Component } from "@/core/ecs"

export class RotationAroundEntity extends Component {

    public speed: number
    public originEntity: Entity
    public delay?: number

    constructor({ speed = 1, originEntity, delay = 0 }: { speed?: number, originEntity: Entity, delay?: number }) {
        super()

        this.speed = speed
        this.originEntity = originEntity
        this.delay = delay
    }
    
}