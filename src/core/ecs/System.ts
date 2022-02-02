import { Game } from "@/core/Game"
import { IUpdate, IAwake } from "@interfaces/lifecycle/lifecycle.h"

export abstract class System implements IUpdate, IAwake {

    protected _game: Game

    constructor(game: Game) {
        this._game = game
    }

    public update(): void {}

    public awake(): void {}
}