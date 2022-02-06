import { Engine } from './Engine'

import { gameConfig } from '@configs'

export default class App {

    public init(): void {

        // create the engine
        const engine = new Engine()
        globalThis.engine = engine
        
        this.loadFirstScene()
        this.setCanvasContext()

        // start the engine
        engine.awake()
    }

    private loadFirstScene(): void {
        
        engine.sceneManager.loadScenes()
        engine.sceneManager.loadScene('mainScene')
    }

    private setCanvasContext(): void {

        const canvas = <HTMLCanvasElement> document.querySelector("#game")
        const ctx = canvas.getContext("2d")!

        globalThis.ctx = ctx

        ctx.canvas.width = gameConfig.window.width
        ctx.canvas.height = gameConfig.window.height
    }
}