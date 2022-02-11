import { Component } from '@ecs'

export class Transform extends Component {

    public position: vector
    public rotation: number
    public velocity: velocity

    constructor(position?: vector, rotation?: number, velocity?: velocity) {
        super()

        this.position = position || { x: 0, y: 0 }
        this.rotation = rotation || 0
        this.velocity = velocity || { x: 0, y: 0, rotation: 0 }
    }
}