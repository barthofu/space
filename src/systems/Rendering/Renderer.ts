import { System } from "@ecs"
import { PolygonRender, CircleRender, Render, Transform, Hidden, SpriteRender } from "@components"
import { drawPolygon, drawCircle, drawImage, worldToCanvasCoordinates, degreesToRadians, getScaledSize, getScaledRadius, getScaledPoints, getScaledPosition } from '@utils/functions'
import { gameConfig } from '@configs'

export class Renderer extends System {

    public update(_deltaTime: number): void {
        
        const camera = engine.scene.getEntitiesByTag('mainCamera')[0],
              cameraTransform = camera.getComponent(Transform)!

        for (const entity of engine.scene.getAllEntities()) {

             // looking if they have the components to render them
            if (entity.matchComponents([Render, Transform], [Hidden])) {

                const transform = entity.getComponent(Transform)!

                if (this.checkIfEntityIsInCameraArea(transform, cameraTransform) || true) {

                    // convertion from world positions to canvas position
                    let position: vector = getScaledPosition(transform.position)
                    position = worldToCanvasCoordinates(position, cameraTransform.position, gameConfig.window)

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
                            radius: getScaledRadius(circleRender.radius),
                            color: {
                                fill: circleRender.fill,
                                outline: circleRender.outline
                            }
                        })
                    }
                    else if (polygonRender) { 

                        drawPolygon({ 
                            position, 
                            points: getScaledPoints(polygonRender.points),
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
                            size: getScaledSize(spriteRender.size),
                            sizeOffset: spriteRender.sizeOffset
                        })
                    }             

                    ctx.restore()
                }

                
            }

        }
    }

    private checkIfEntityIsInCameraArea(entityTransform: Transform, cameraTransform: Transform): boolean {

        const cameraPosition = getScaledPosition(cameraTransform.position),
              entityPosition = getScaledPosition(entityTransform.position),
              size = gameConfig.window

        return true 

        return (
            entityPosition.x + size.width > cameraPosition.x - size.width / 2 &&
            entityPosition.x - size.width < cameraPosition.x + size.width / 2 &&
            entityPosition.y + size.height > cameraPosition.y - size.height / 2 &&
            entityPosition.y - size.height < cameraPosition.y + size.height / 2
        )
    }


    
}