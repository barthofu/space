import { gameConfig } from '@configs'
import '@styles/main.scss'
import { Game } from '@/core/Game'
import { Map } from '@/core/Map'

const canvas = <HTMLCanvasElement> document.querySelector("#game")
const ctx = canvas.getContext("2d")!

ctx.canvas.width = gameConfig.window.width
ctx.canvas.height = gameConfig.window.height

globalThis.game = new Game()
globalThis.ctx = ctx
globalThis.pressedKeys = {}

window.onkeydown = (e) => pressedKeys[e.key] = true
window.onkeyup = (e) => pressedKeys[e.key] = false

new Map().generate()
game.awake()