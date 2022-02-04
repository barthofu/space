import { randomizeWithinRange } from "@utils/functions"

/**
 * Generate an asteroid irregular polygon shape
 * @param numberOfNodes How many dents the asteroid has
 * @param minRadius Radius of the deepest valley
 * @param maxRadius Radius of the highest montain
 */
export function generateAsteroidShape(numberOfNodes: number, minRadius: number, maxRadius: number) {

    const angleStep = Math.PI * 2 / numberOfNodes
    const shape = []
    numberOfNodes = randomizeWithinRange(numberOfNodes, 5)

    for (let i = 0; i < numberOfNodes; i++) {
        const angle = angleStep * i
        const radius = minRadius + Math.random() * (maxRadius - minRadius)
        shape.push([Math.cos(angle) * radius, Math.sin(angle) * radius])
    }
    
    console.log(shape)
    return shape
}


export function generateTriangleShape(position: vector) {

    return [[-position.x, position.y], [0, -position.y], [position.x, position.y], [position.x, position.y]]
}