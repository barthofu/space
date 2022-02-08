import { Render } from './Render'

export class SpriteRender extends Render {

    public asset: string
    public size: size
    public sizeOffset: size

    constructor(asset: string, size: size, sizeOffset: size = { width: 0, height: 0 }) {
        super()

        this.asset = 'assets/' + asset
        this.size = size
        this.sizeOffset = sizeOffset
    }
}