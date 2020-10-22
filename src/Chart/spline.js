import { points } from '../constants'

function f(x) {
    return (Math.sin(x) * Math.sqrt(x) + 1)
}

export const func = []
const n = points.length

for (let i = 0; i < 128; i++) {
    let x = i / 20
    func.push({
        x: x,
        y: f(x)
    })
}

const h = [0]

//коэффициенты для матрицы под прогонку

const a = [0]
const b = [0]
const c = [0]
const d = [0]


for (let i = 1; i < n; i++) {
    h[i] = points[i] - points[i - 1]
}

//нахождение коэффициентов уравнений для алгоритма прогонки

for (let i = 1; i < (n - 1); i++) {
    a[i] = h[i] / (h[i] + h[i + 1])
}

for (let i = 1; i < (n - 1); i++) {
    b[i] = -2
}

for (let i = 1; i < (n - 1); i++) {
    c[i] = h[i + 1] / (h[i] + h[i + 1])
}

for (let i = 1; i < (n - 1); i++) {
    d[i] = 6 * ((f(points[i + 1]) - f(points[i])) / h[i + 1] - (f(points[i]) - f(points[i - 1])) / h[i]) / (points[i + 1] - points[i - 1])
}

//начало прогонки, нахождение коэффициентов линейной зависимости корней

let m = [0]
const coeffs = [{ s: 0, t: 0 }, { s: c[1] / b[1], t: -d[1] / b[1] }]

for (let i = 2; i < (n - 1); i++) {
    coeffs[i] = {
        s: c[i] / (b[i] - coeffs[i - 1].s),
        t: (a[i] * coeffs[i - 1].t - d[i]) / (b[i] - coeffs[i - 1].s * a[i])
    }
}

//нахождение корней, прогонка в обратном направлении

for (let i = n - 2; i > 0; i--) {
    if (i === n - 2) {
        m[i + 1] = 0
        m[i] = coeffs[i].t
    }
    else {
        m[i] = coeffs[i].s * m[i + 1] + coeffs[i].t
    }
}

export const test = []

function cubicPolynomial(x, i) { //i = 1,2 ... n
    return (
        (m[i - 1] * Math.pow(points[i] - x, 3)) / (6 * h[i]) +
        (m[i] * Math.pow(-points[i - 1] + x, 3)) / (6 * h[i]) +
        (f(points[i - 1]) - m[i - 1] * h[i] * h[i] / 6) * ((points[i] - x) / h[i]) +
        (f(points[i]) - m[i] * h[i] * h[i] / 6) * ((-points[i - 1] + x) / h[i])
    )
}

function getPointsOfPolynomial(index) {
    const res = []
    for (let i = Math.round(points[index - 1] * 20); i <= Math.round(points[index] * 20); i++) {
        let x = i / 20
        res.push({
            x: x,
            y: cubicPolynomial(x, index)
        })
    }
    return res
}

export const spline = []

const colors = ['#4256b1',
    '#10e300']

for (let i = 1; i < n; i++) {
    spline.push({
        color: colors[i % 2],
        points: getPointsOfPolynomial(i)
    })
}
