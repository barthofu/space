import { Component, Entity } from '@ecs'
import { Game } from "@/core/Game"
import { IUpdate, IAwake } from "@interfaces/lifecycle/lifecycle.h"

export abstract class System implements IUpdate, IAwake {

    protected _game: Game
    protected requiredComponents: constr<Component>[] 

    constructor(game: Game) {
        this._game = game
    }

    public update(): void {

        if (this.beforeRun()) {
        
            for (const entity of this._game.entities) {
                const hasAllComponents = this.requiredComponents.every(component => entity.hasComponent(component))

                if (hasAllComponents) this.run(entity)
            }
        }
    }

    public awake(): void {}

    protected beforeRun(): boolean {

        return true
    }
    
    protected abstract run(entity: Entity): void
}