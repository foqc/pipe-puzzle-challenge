import { fromArrayToPipe, getPipeSidesArray } from '../utils/utils'

export type Pipe = {
    hasTop: boolean
    hasRight: boolean
    hasLeft: boolean
    hasBottom: boolean
}

export type PipeSquareShape = {
    shape: string
    isConnected: boolean
    color: string
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
        const newSides = [...sides]
        if (!this.isElbowPipe(sides)) return sides
        for (let i = 0; i < sides.length; i++) {
            if (sides[0] && sides[sides.length - 1] && i === sides.length - 1) {
                newSides[0] = true
                newSides[sides.length - 1] = false
                newSides[sides.length - 2] = false
                continue
            }
            if (sides[i]) {
                const pos = i + 1 < sides.length ? i + 1 : 0
                const adyacentPos = pos + 1 < sides.length ? pos + 1 : 0
                newSides[i] = false
                newSides[pos] = true
                newSides[adyacentPos] = true
                // break
                i++
            }
        }
        return newSides
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
        const verticalShape = [false, true, false, true]
        const horizontalShape = [true, false, true, false]
        return sides.every((item, index) => item === verticalShape[index])
            || sides.every((item, index) => item === horizontalShape[index])
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
        maybeRotatedSides = this.rotateTPipe(maybeRotatedSides)
        maybeRotatedSides = this.rotateSmallLinePipe(maybeRotatedSides)
        maybeRotatedSides = this.rotateLargeLinePipe(maybeRotatedSides)

        this.pipe = fromArrayToPipe(maybeRotatedSides)
    }

    setIsConnected(isConnected: boolean) {
        this.isConnected = isConnected
    }

    setColor(color: string) {
        this.color = color
    }
}