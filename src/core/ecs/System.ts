import Engine from "@core/Engine"
import { Component } from '@ecs'
import { IUpdate, IAwake } from "@interfaces"

export abstract class System implements IUpdate, IAwake {

    protected engine: Engine
    protected requiredComponents: Class<Component>[] 

    constructor(engine: Engine) {
        this.engine = engine
    }

    public awake(): void {}

    public abstract update(_deltaTime: number): void

}