import { System } from '@ecs'
import { gameConfig } from '@configs'

export class ClearCanvas extends System {

    public update(_deltaTime: number): void {
        
        ctx.clearRect(0, 0, gameConfig.window.width, gameConfig.window.height)
    }
}