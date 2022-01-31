import config from '@configs/game'
import '@styles/main.scss'

console.log(config)

const canvas = <HTMLCanvasElement> document.querySelector("#game")
const ctx = canvas.getContext("2d")!

ctx.canvas.width = config.screen.width
ctx.canvas.height = config.screen.height