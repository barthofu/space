import { ShapeRender } from './ShapeRender'

export class CircleRender extends ShapeRender {

    public radius: number

    constructor(radius: number, color: color) {
        super(color)

        this.radius = radius
    }
}