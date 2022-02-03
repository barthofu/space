import { Entity } from '@ecs'
import { Position } from '@components'

import { mapConfig } from '@configs'

export class Camera extends Entity {

    constructor(isMainCamera ? : boolean) {
        super()

        if (isMainCamera) this.tag = 'mainCamera'

        this._components = [
            new Position(
                mapConfig.size.width / 2,    // x
                mapConfig.size.height / 2    // y
            )
        ]
    }
}