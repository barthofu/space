import { Render } from './Render'

export class ShapeRender extends Render {

    public fill?: string
    public outline?: string

    constructor({ fill, outline }: color) {
        super()

        this.fill = fill
        this.outline = outline
    }
}