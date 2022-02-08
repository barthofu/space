export function distanceBetweenTwoPoints(point1: vector, point2: vector) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
}