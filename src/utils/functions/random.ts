export function randomizeWithinRange(number: number, range: number): number {
    return number + Math.random() * range * (Math.random() < 0.5 ? -1 : 1)
}

export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}