import { System } from "@ecs"
import { PolygonRender, CircleRender, Render, Transform, Hidden, SpriteRender } from "@components"
import { drawPolygon, drawCircle, drawImage, worldToCanvasCoordinates, degreesToRadians } from '@utils/functions'
import { gameConfig } from '@configs'

export class Renderer extends System {


    public update(_deltaTime: number): void {
        
        const camera = this.engine.getEntitiesByTag('mainCamera')[0],
              cameraTransform = camera.getComponent(Transform)!

        for (const entity of this.engine.entities) {

             // looking if they have the components to render them
            if (entity.matchComponents([Render, Transform], [Hidden])) {

                const transform = entity.getComponent(Transform)!

                // convertion from world positions to canvas position
                let position: vector = worldToCanvasCoordinates(transform.position, cameraTransform.position, gameConfig.window)

                // rotate the canvas according to the entity rotation
                ctx.save()
                ctx.translate(position.x, position.y)
                ctx.rotate(degreesToRadians(transform.rotation))

                // now that the canvas is translated to the entity position, we reset the position to 0,0 to match with the origin the canvas
                position = { x: 0, y: 0 }

                const circleRender = entity.getComponent(CircleRender),
                      polygonRender = entity.getComponent(PolygonRender),
                      spriteRender = entity.getComponent(SpriteRender)
                
                if (circleRender) {
                    drawCircle({ 
                        position, 
                        radius: circleRender.radius,
                        color: {
                            fill: circleRender.fill,
                            outline: circleRender.outline
                        }
                    })
                }
                else if (polygonRender) { 
                    drawPolygon({ 
                        position, 
                        points: polygonRender.points,
                        color: {
                            fill: polygonRender.fill,
                            outline: polygonRender.outline
                        }
                    })
                }   
                else if (spriteRender) {

                    const image = new Image()
                    image.src = spriteRender.asset
                    
                    drawImage({
                        image: image,
                        position,
                        size: spriteRender.size,
                        sizeOffset: spriteRender.sizeOffset
                    })
                }             

                ctx.restore()
            }
        }
    }


    
}