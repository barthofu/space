import { Position, Size } from '@components'

export function convertCoordinates (entityPosition: Position, cameraPosition: Position, cameraSize: Size): coordinates {

    const newPosition = {
        x: entityPosition.x - (cameraPosition.x - cameraSize.width / 2),
        y: entityPosition.y - (cameraPosition.y - cameraSize.height / 2)
    }

    return newPosition
}