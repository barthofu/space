import { Entity } from '@ecs'
import { Transform } from '@components'

import { mapConfig } from '@configs'

export class Camera extends Entity {

    constructor(isMainCamera ? : boolean) {
        super()

        if (isMainCamera) this.tag = 'mainCamera'

        this.addComponent(new Transform())
    }
}