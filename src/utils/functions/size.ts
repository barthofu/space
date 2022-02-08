import { mapConfig } from '@configs'

export function getScaledSize(size: size): size {

    return {
        width: size.width * engine.config.scale,
        height: size.height * engine.config.scale
    }
}

export function getScaledRadius(radius: number): number {

    return radius * engine.config.scale
}

export function getScaledPoints(points: number[][]): number[][] {
    return points.map(point => [point[0] * engine.config.scale, point[1] * engine.config.scale])
}

export function getScaledPosition(position: vector): vector {

    return {
        x: position.x * engine.config.scale,
        y: position.y * engine.config.scale
    }
}