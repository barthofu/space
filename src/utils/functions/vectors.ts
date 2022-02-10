export function distanceBetweenTwoPoints(point1: vector, point2: vector) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
}

export function getAngularPosition(entityPosition: vector, originPosition: vector, angle: number): vector {

    angle = angle * Math.PI / 180
    
    const deltaX = entityPosition.x - originPosition.x,
          deltaY = entityPosition.y - originPosition.y

    return {
        x: deltaX * Math.cos(angle) - deltaY * Math.sin(angle) + originPosition.x,
        y: deltaX * Math.sin(angle) + deltaY * Math.cos(angle) + originPosition.y
    }    
}