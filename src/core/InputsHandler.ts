import { controlsConfig } from "@configs"

export class InputsHandler {

    private pressedKeys: { [key: string]: boolean } = {}

    constructor() {

        window.addEventListener('keydown', this.onKeyDown.bind(this))
        window.addEventListener('keyup', this.onKeyUp.bind(this))
        window.addEventListener('wheel', this.wheelHandler.bind(this))
    }

    public isKeyDown(key: string): boolean {
        return this.pressedKeys[controlsConfig[key as keyof typeof controlsConfig]]
    }

    private onKeyDown(e: KeyboardEvent): void {
        this.pressedKeys[e.key] = true
    }

    private onKeyUp(e: KeyboardEvent): void {
        this.pressedKeys[e.key] = false
    }

    private wheelHandler(e: WheelEvent): void {
        if (e.deltaY > 0) {
            if (engine.config.scale < 20)
                engine.config.scale += 0.1
        } else {
            if (engine.config.scale > 1)
                engine.config.scale -= 0.1
        }
    }
}