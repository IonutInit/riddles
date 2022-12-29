//as the game advances, and the number of steps increase, so do the chances that the result is different than the base number

export function changePoints(steps, base, divider) {
    return base + (Math.floor(Math.random() * steps / divider))
}