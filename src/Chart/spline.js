function f(x) {
    return (Math.sin(x) * Math.sqrt(x) + 1)
}

export const func = []

for (let i = 0; i < 128; i++) {
    let x = i / 20
    func.push({
        x: x,
        y: f(x)
    })
}