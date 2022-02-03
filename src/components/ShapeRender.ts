import { Component } from '@ecs'

export class ShapeRender extends Component {

    public shape: string
    public color: string
    public options: any[]

    constructor(shape: string, color: string, options: any[]) {
        super()

        this.shape = shape
        this.color = color
        this.options = options
    }
}