export function randomizeWithinRange(number: number, range: number): number {
    return number + Math.random() * range * (Math.random() < 0.5 ? -1 : 1)
}