import { randomizeWithinRange } from "@utils/functions"

/**
 * Generate an asteroid irregular polygon shape
 * @param numberOfNodes How many dents the asteroid has
 * @param minRadius Radius of the deepest valley
 * @param maxRadius Radius of the highest montain
 */
export function generateAsteroidShape(numberOfNodes: number, minRadius: number, maxRadius: number): number[][] {

    numberOfNodes = randomizeWithinRange(numberOfNodes, 5)
    const shape = []
    const angleStep = Math.PI * 2 / numberOfNodes

    for (let i = 0; i < numberOfNodes; i++) {
        const angle = angleStep * i
        const radius = minRadius + Math.random() * (maxRadius - minRadius)
        shape.push([Math.cos(angle) * radius, Math.sin(angle) * radius])
    }
    
    return shape
}


export function generateTriangleShape(position: vector): number[][] {
    return [[-position.x, position.y], [0, -position.y], [position.x, position.y], [position.x, position.y]]
}

export function generateSquareShape(position: vector): number[][] {
    return [[-position.x, -position.y], [-position.x, position.y], [position.x, position.y], [position.x, -position.y]]
}