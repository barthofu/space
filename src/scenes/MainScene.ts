import { Scene } from '@core/Scene'
import { 
    Spaceship,
    Asteroid,
    Planet,
    Camera
} from '@entities'
import * as systems from '@systems'
import { mapConfig } from '@configs'

export class MainScene extends Scene {

    _systemsToLoad = [
        new systems.ClearCanvas(),
        new systems.ControlPlayer(),
        new systems.MoveEntities(),
        new systems.ShootBullet(),
        new systems.BulletManager(),
        new systems.Thrust(),
        new systems.CollisionsManager(),
        new systems.CenterCamera(),
        //new systems.RenderCollisions(),
        new systems.Renderer(),
        new systems.Debug()
    ]
    
    public awake() {

        this.generateMap()
        this.loadSystems()
    }


    private generateMap() {

        this.size = mapConfig.size

        this.addEntity(new Spaceship())
        this.addEntity(new Camera(true))

        this.generateSolarSystem()
    }


    private generateSolarSystem() {

    }

}