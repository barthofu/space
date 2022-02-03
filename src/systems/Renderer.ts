import { System } from "@ecs"
import { ShapeRender, Transform, Hidden } from "@components"
import { worldToCanvasCoordinates, degreesToRadians } from '@utils'
import { gameConfig } from '@configs'

export class Renderer extends System {


    public update(_deltaTime: number): void {
        
        const camera = this.engine.getEntitiesByTag('mainCamera')[0],
              cameraTransform = camera.getComponent(Transform)!

        // we first clear the canvas for redrawing
        ctx.clearRect(0, 0, gameConfig.window.width, gameConfig.window.height)

        for (const entity of this.engine.entities) {

             // looking if they have the components to render them
            if (entity.matchComponents([ShapeRender, Transform], [Hidden])) {

                const transform = entity.getComponent(Transform)!,
                      shapeRender = entity.getComponent(ShapeRender)

                // convertion from world positions to canvas position
                let position: vector = worldToCanvasCoordinates(transform.position, cameraTransform.position, gameConfig.window)

                // rotate the canvas according to the entity rotation
                ctx.save()
                ctx.translate(position.x, position.y)
                ctx.rotate(degreesToRadians(transform.rotation))

                // now that the canvas is translated to the entity position, we reset the position to 0,0 to match with the origin the canvas
                position = { x: 0, y: 0 }

                if (shapeRender) {
                    if (shapeRender.shape === 'triangle') 
                        this.drawTriangle({ 
                            position, 
                            color: shapeRender.color, 
                            size: {
                                width: shapeRender.options[0],
                                height: shapeRender.options[1]
                            }
                        })
                    else if (shapeRender.shape === 'circle') 
                        this.drawCircle({ 
                            position, 
                            color: shapeRender.color, 
                            radius: shapeRender.options[0]
                        })
                }

                ctx.restore()
                    
            }
        }
    }


    private drawTriangle({ position, color, size }: { position: vector, color: string, size: size }) {

        ctx.beginPath()

        ctx.moveTo(
            position.x - (size.width / 2),
            position.y + (size.height / 2)
        )
        ctx.lineTo(
            position.x,
            position.y - (size.height / 2)
        )
        ctx.lineTo(
            position.x + (size.width / 2),
            position.y + (size.height / 2)
        )

        ctx.fillStyle = color
        ctx.fill()
    }



    private drawCircle({ position, color, radius }: { position: vector, color: string, radius: number }) {

        ctx.beginPath()

        // draw the circle
        ctx.arc(
            position.x,
            position.y,
            radius,
            0,
            2 * Math.PI
        )

        ctx.fillStyle = color
        ctx.fill()
    }
}