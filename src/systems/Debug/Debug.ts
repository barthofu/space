import { System } from '@ecs'

export class Debug extends System {

    public update(_deltaTime: number): void {
        
        if (engine.input.isKeyDown('debug')) {

            console.log(engine)
        }
    }
}