import { Component } from '@ecs'

export class ShapeRender extends Component {

    public fill?: string
    public outline?: string

    constructor({ fill, outline }: color) {
        super()

        this.fill = fill
        this.outline = outline
    }
}