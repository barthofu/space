import { Entity, System } from '@ecs'
import { IAwake, IUpdate } from '@utils/interfaces'

import { InputsHandler } from './InputsHandler'
import { StateManager } from './StateManager'
import { SceneManager } from './SceneManager'
import { Scene } from './Scene'
import { mapConfig } from '@configs'

export class Engine implements IAwake, IUpdate {

    private _lastTimestamp = 0
    private readonly _input = new InputsHandler()
    private readonly _state = new StateManager()
    private readonly _sceneManager = new SceneManager()
    private readonly _config = {
        scale: mapConfig.scale
    }
    private _systems: System[] = []

    public awake(): void {

        // awake all the systems
        for (const system of this.systems) {
            system.awake()
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

        // call update on all the systems
        for (const system of this.systems) {
            system.update(deltaTime)
        }

        // update the current timestamp
        this._lastTimestamp = Date.now()

        // invoke on next frame
        window.requestAnimationFrame(() => this.update())
    }

    // Entities 

    public get entities(): Entity[] { return this.scene.entities }

    // InputsHandler

    public get input(): InputsHandler { return this._input }
    
    // StateManager

    public get state(): StateManager { return this._state }

    // SceneManager

    public get sceneManager(): SceneManager { return this._sceneManager }

    // Scene

    public get scene(): Scene { return this._sceneManager.currentScene }

    // Systems

    public get systems(): System[] { return this._systems }
    public set systems(systems: System[]) { this._systems = systems }

    public getSystem<C extends System>(constr: Class<C>): C { return this.systems.find(system => system instanceof constr) as C }

    public addSystem(system: System): void { this.systems.push(system) }

    // Config

    public get config(): { [key: string]: any } { return this._config }

}