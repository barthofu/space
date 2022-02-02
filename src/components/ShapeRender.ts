import { Component } from '@ecs'

export class ShapeRender extends Component {

    public shape: string
    public color: string

    constructor(shape: string, color: string) {
        super();
        this.shape = shape
        this.color = color
    }
}