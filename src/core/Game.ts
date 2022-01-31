import Entity from "@interfaces/ecs/entity.h"

export default class Game extends Entity {

    private _lastTimestamp = 0
    public entities: Entity[] = []

    public awake(): void {
        super.awake()

        // awake all the child entities
        for (const entity of this.entities) {
            entity.awake()
        }

        // make sure all entities and components are awaken before starting the game
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now()

            // start the game loop
            this.update()
        })
    }

    public update(): void {
        
        // calculate the time passed since last update
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000
        
        // call update on all the entities
        super.update(deltaTime)

        // call update on all the child entities
        for (const entity of this.entities) {
            entity.update(deltaTime)
        }

        // update the current timestamp
        this._lastTimestamp = Date.now()

        // invoke on next frame
        window.requestAnimationFrame(() => this.update())
    }
}