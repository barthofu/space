import { System } from '@ecs'

export class Debug extends System {

    public update(_deltaTime: number): void {
        
        if (this.engine.input.isKeyDown('debug')) {

            console.log(this.engine)
        }
    }
}