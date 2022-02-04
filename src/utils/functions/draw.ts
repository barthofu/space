type drawArgs = {
    position: vector,
    color: color
}

export function drawCircle({ position, radius, color }: drawArgs & { radius: number }): void {

    ctx.beginPath()

    // draw the circle
    ctx.arc(
        position.x,
        position.y,
        radius,
        0,
        2 * Math.PI
    )

    finishDraw(color)
}

export function drawPolygon({ position, points, color }: drawArgs & { points: number[][] }): void {

    ctx.beginPath()

    // draw the polygon
    ctx.moveTo(
        position.x + points[0][0],
        position.y + points[0][1]
    )

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(
            position.x + points[i][0],
            position.y + points[i][1]
        )
    }

    ctx.lineTo(
        position.x + points[0][0],
        position.y + points[0][1]
    )

    finishDraw(color)
}

function finishDraw({fill, outline}: color): void {

    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (outline) {
        ctx.strokeStyle = outline
        ctx.stroke()
    }
}