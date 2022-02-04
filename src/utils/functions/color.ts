import colorString from 'color-string'

export function adjustAlpha(rgba: string, amount: number): string {
    const colors = colorString.get.rgb(rgba)
    if (colors?.length && colors.length > 3) colors[3] += amount
    return colorString.to.rgb(colors)
}