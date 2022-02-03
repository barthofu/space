import { Entity } from '@ecs'
import { Transform } from '@components'

import { mapConfig } from '@configs'

export class Camera extends Entity {

    constructor(isMainCamera ? : boolean) {
        super()

        if (isMainCamera) this.tag = 'mainCamera'

        this.addComponent(new Transform({
            x: mapConfig.size.width / 2,
            y: mapConfig.size.height / 2
        }))
    }
}