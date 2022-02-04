import { ShapeRender } from './ShapeRender'

export class PolygonRender extends ShapeRender {

    public points: number[][]

    constructor(points: number[][], color: color) {
        super(color)

        this.points = points
    }
}