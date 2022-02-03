import { gameConfig } from '@configs'
import './styles.scss'
import Engine from '@core/Engine'
//import { Map } from '@/core/Map'

const canvas = <HTMLCanvasElement> document.querySelector("#game")
const ctx = canvas.getContext("2d")!

globalThis.ctx = ctx

ctx.canvas.width = gameConfig.window.width
ctx.canvas.height = gameConfig.window.height

const engine = new Engine()

engine.awake()