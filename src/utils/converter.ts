export function convertCoordinates (entityPosition: vector, cameraPosition: vector, cameraSize: size): vector {

    const newPosition = {
        x: entityPosition.x - (cameraPosition.x - cameraSize.width / 2),
        y: entityPosition.y - (cameraPosition.y - cameraSize.height / 2)
    }

    return newPosition
}