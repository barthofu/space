import { Component } from '@ecs'

export class Collider extends Component {

    public radius: number

    constructor(radius: number) {
        super()

        this.radius = radius
    }
}