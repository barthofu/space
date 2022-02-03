import { controlsConfig } from "@configs"

export class InputsHandler {

    private pressedKeys: { [key: string]: boolean } = {}

    constructor() {

        window.addEventListener('keydown', this.onKeyDown.bind(this))
        window.addEventListener('keyup', this.onKeyUp.bind(this))
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
}