import { Entity, System } from "@ecs"
import { ShapeRender, Size, Position } from "@components"
import { convertCoordinates } from '@utils'

export class Renderer extends System {

    protected requiredComponents = [
        Position,
        Size
    ]
    private cameraPosition: Position
    private cameraSize: Size



    public beforeRun(): boolean {

        const camera = this._game.getEntitiesByTag('mainCamera')[0]

        this.cameraPosition = camera.getComponent(Position)!
        this.cameraSize = camera.getComponent(Size)!

        // we first clear the canvas for redrawing
        ctx.clearRect(0, 0, this.cameraSize.width, this.cameraSize.height)

        return true
    }



    public run(entity: Entity) {

        // looking if they have the components to render them
        const entityPosition = entity.getComponent(Position),
                size = entity.getComponent(Size),
                shapeRender = entity.getComponent(ShapeRender)/*,
                spriteRender = entity.getComponent(SpriteRender)*/

        if (entityPosition && size) {

            // convertion from world positions to canvas position
            const position: coordinates = convertCoordinates(entityPosition, this.cameraPosition, this.cameraSize)
        
            if (shapeRender) {
                if (shapeRender.shape === 'triangle') this.drawTriangle({ position, size, color: shapeRender.color })
                else if (shapeRender.shape === 'circle') this.drawCircle({ position, size, color: shapeRender.color })
            }
            
        }
    }



    private drawTriangle({ position, size, color }: { position: coordinates, size: Size, color: string }) {

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



    private drawCircle({ position, size, color }: { position: coordinates, size: Size, color: string }) {

        ctx.beginPath()

        // draw the circle
        ctx.arc(
            position.x,
            position.y,
            size.width / 2,
            0,
            2 * Math.PI
        )

        ctx.fillStyle = color
        ctx.fill()
    }
}