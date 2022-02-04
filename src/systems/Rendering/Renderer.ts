import { System } from "@ecs"
import { PolygonRender, CircleRender, ShapeRender, Transform, Hidden } from "@components"
import { drawPolygon, drawCircle, worldToCanvasCoordinates, degreesToRadians } from '@utils/functions'
import { gameConfig } from '@configs'

export class Renderer extends System {


    public update(_deltaTime: number): void {
        
        const camera = this.engine.getEntitiesByTag('mainCamera')[0],
              cameraTransform = camera.getComponent(Transform)!

        for (const entity of this.engine.entities) {

             // looking if they have the components to render them
            if (entity.matchComponents([ShapeRender, Transform], [Hidden])) {

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
                      polygonRender = entity.getComponent(PolygonRender)

                
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

                ctx.restore()
            }
        }
    }


    
}