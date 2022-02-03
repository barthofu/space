import { Component } from '@ecs'

export class Transform extends Component {

    public position: vector
    public rotation: number
    public velocity: vector

    constructor(position: vector, rotation?: number, velocity?: vector) {
        super()

        this.position = position || { x: 0, y: 0 }
        this.rotation = rotation || 0
        this.velocity = velocity || { x: 0, y: 0 }
    }
}