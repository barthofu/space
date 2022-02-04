type vector = {
    x: number,
    y: number
}

type velocity = vector & {
    rotation: number
}

type size = {
    width: number,
    height: number
}

type color = { 
    fill?: string, 
    outline?: string 
}