import { Entity, Component } from "@/core/ecs"

export class RotationAroundEntity extends Component {

    public speed: number
    public originEntity: Entity

    constructor({ speed = 1, originEntity }: { speed?: number, originEntity: Entity }) {
        super()

        this.speed = speed
        this.originEntity = originEntity
    }
    
}