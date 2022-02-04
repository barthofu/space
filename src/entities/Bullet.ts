import { Particle } from './Particle'
import { Collider } from '@components'

export class Bullet extends Particle {

    public static lastCreated: number = Date.now()

    constructor(args: particleArgs) {
        super(args)
        
        Bullet.lastCreated = Date.now()
        this.addComponent(new Collider(args.size / 2))
    }

}