import { Scene } from './Scene'
import * as scenes from '@scenes'

export class SceneManager {

    private _currentScene: Scene
    private _scenes: Scene[] = []

    public loadScenes(): void {

        for (const scene of Object.keys(scenes)) {

            const sceneName = scene.slice(0, 1).toLowerCase() + scene.slice(1),
                  sceneClass = scenes[scene as keyof typeof scenes],
                  sceneInstance = new sceneClass(sceneName)

            this.scenes.push(sceneInstance)
        }
    }

    public loadScene(name: string): void {

        const scene = this.scenes.find(scene => scene.name === name)

        if (scene) {
            this.currentScene = scene
            scene.awake()
        }
    }

    // Getters and Setters
    
    public get currentScene(): Scene { return this._currentScene }
    public set currentScene(value: Scene) { this._currentScene = value }

    public get scenes(): Scene[] { return this._scenes }
    public set scenes(value: Scene[]) { this._scenes = value }
}