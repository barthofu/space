import { Entity } from '@ecs' 
import { Transform, PolygonRender } from '@components'
import { generateSquareShape } from '@utils/functions'
import { gameConfig } from '@configs'

export class Background extends Entity {

    constructor() {
        super()

        this.addComponent(new Transform())
        this.addComponent(new PolygonRender(
            generateSquareShape({
                x: gameConfig.window.width / 2,
                y: gameConfig.window.height / 2,
            }),
            { fill: '#000' }
        ))
    }

}