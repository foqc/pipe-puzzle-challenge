import { fromArrayToPipe, getPipeSidesArray } from '../utils/utils'

export type Pipe = {
    hasTop: boolean
    hasRight: boolean
    hasLeft: boolean
    hasBottom: boolean
}

export class PipeSquare {
    pipe: Pipe
    isConnected: boolean
    color: string

    constructor(pipe: Pipe, isConnected: boolean, color: string) {
        this.pipe = pipe
        this.isConnected = isConnected
        this.color = color
    }

    isElbowPipe(sides: boolean[]): boolean {
        let countAdyacentSides: number = 0
        for (let i = 0; i < sides.length; i++) {
            const nextPos = i + 1
            const pos = nextPos < sides.length ? nextPos : 0
            if (sides[i] && sides[pos]) countAdyacentSides++
        }
        return countAdyacentSides === 1
    }

    rotateElbowPipe(sides: boolean[]): boolean[] {
        if (!this.isElbowPipe(sides)) return sides
        for (let i = 0; i < sides.length; i++) {
            if (sides[i]) {
                const pos = i + 1 < sides.length ? i + 1 : 0
                const adyacentPos = pos + 1 < sides.length ? pos + 1 : 0
                sides[i] = false
                sides[pos] = true
                sides[adyacentPos] = true
                break
            }
        }
        return sides
    }

    isTPipe(sides: boolean[]): boolean {
        let countEmptySides: number = 0
        for (let i = 0; i < sides.length; i++) {
            if (!sides[i]) countEmptySides++
            if (countEmptySides > 1) break
        }
        return countEmptySides === 1
    }

    rotateTPipe(sides: boolean[]): boolean[] {
        if (!this.isTPipe(sides)) return sides
        for (let i = 0; i < sides.length; i++) {
            if (!sides[i]) {
                const pos = i + 1 < sides.length ? i + 1 : 0
                sides[i] = true
                sides[pos] = false
                break
            }
        }
        return sides
    }

    isSmallLinePipe(sides: boolean[]): boolean {
        let countSides: number = 0
        for (let i = 0; i < sides.length; i++) {
            if (sides[i]) countSides++
            if (countSides > 1) break
        }
        return countSides === 1
    }

    rotateSmallLinePipe(sides: boolean[]): boolean[] {
        if (!this.isSmallLinePipe(sides)) return sides
        for (let i = 0; i < sides.length; i++) {
            if (sides[i]) {
                const pos = i + 1 < sides.length ? i + 1 : 0
                sides[i] = false
                sides[pos] = true
                break
            }
        }
        return sides
    }

    isLargeLinePipe(sides: boolean[]): boolean {
        return sides === [false, true, false, true] || sides === [true, false, true, false]
    }

    rotateLargeLinePipe(sides: boolean[]): boolean[] {
        if (!this.isLargeLinePipe(sides)) return sides
        for (let i = 0; i < sides.length; i++) {
            sides[i] = !sides[i]
        }
        return sides
    }

    isCrossLinePipe(sides: boolean[]): boolean {
        let countEmptySides: number = 0
        for (let i = 0; i < sides.length; i++) {
            if (!sides[i]) countEmptySides++
            if (countEmptySides > 1) break
        }
        return countEmptySides === 0
    }

    rotate(): void {
        const sides: boolean[] = getPipeSidesArray(this.pipe)
        let maybeRotatedSides = this.rotateElbowPipe(sides)
        maybeRotatedSides = this.rotateTPipe(sides)
        maybeRotatedSides = this.rotateSmallLinePipe(sides)
        maybeRotatedSides = this.rotateLargeLinePipe(sides)

        this.pipe = fromArrayToPipe(maybeRotatedSides)
    }

    setIsConnected(isConnected: boolean) {
        this.isConnected = isConnected
    }

    setColor(color: string) {
        this.color = color
    }
}