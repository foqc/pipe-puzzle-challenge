import { DIRECTION, PipeSquare } from './types'

export class GameAsistant {
    matrix: PipeSquare[][]
    rows: number
    cols: number

    constructor(matrix: PipeSquare[][]) {
        this.matrix = matrix
        this.rows = matrix.length
        this.cols = matrix[0].length
    }

    rotateTile(posX: number, posY: number): void {
        this.matrix[posX][posY].rotate()
        this.evaluateMapPipes()
    }

    disconnectAllPipes() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.matrix[y][x].isConnected = false
            }
        }
    }

    evaluateMapPipes(): void {
        this.disconnectAllPipes()
        let visitedPipes: PipeSquare[] = []
        this.evaluateTileAtPos(0, 0, visitedPipes)
    }

    isInsideOfMatrix(posX: number, posY: number): boolean {
        return posX >= 0 && posX < this.rows && posY >= 0 && posY < this.cols
    }

    getUpPipe(posX: number, posY: number): PipeSquare | null {
        if (this.isInsideOfMatrix(posX - 1, posY))
            return this.matrix[posX - 1][posY]
        return null;
    }

    getRightPipe(posX: number, posY: number): PipeSquare | null {
        if (this.isInsideOfMatrix(posX, posY + 1))
            return this.matrix[posX][posY + 1]
        return null
    }

    getDownPipe(posX: number, posY: number): PipeSquare | null {
        if (this.isInsideOfMatrix(posX + 1, posY))
            return this.matrix[posX + 1][posY]
        return null
    }

    getLeftPipe(posX: number, posY: number): PipeSquare | null {
        if (this.isInsideOfMatrix(posX, posY - 1))
            return this.matrix[posX][posY - 1]
        return null
    }

    getPipeAt(posX: number, posY: number): PipeSquare {
        return this.matrix[posX][posY]
    }

    adyacentPipeIsConnected(source: PipeSquare | null, target: PipeSquare | null, direction: DIRECTION): boolean {
        if (!source || !target) return false
        const { pipe: sourcePipe } = source
        const { pipe: targetPipe } = target
        switch (direction) {
            case DIRECTION.UP:
                return sourcePipe.hasTop && targetPipe.hasBottom;
            case DIRECTION.RIGHT:
                return sourcePipe.hasRight && targetPipe.hasLeft;
            case DIRECTION.DOWN:
                return sourcePipe.hasBottom && targetPipe.hasTop;
            case DIRECTION.LEFT:
                return sourcePipe.hasLeft && targetPipe.hasRight;
            default:
                return false
        }
    }

    getAdyacenteConnectedPipes(posX: number, posY: number): PipeSquare[] {
        let list: PipeSquare[] = []
        const currentPipeSquare = this.getPipeAt(posX, posY)
        const upPipeSquare = this.getUpPipe(posX, posY)
        const rightPipeSquare = this.getRightPipe(posX, posY)
        const downPipeSquare = this.getDownPipe(posX, posY)
        const leftPipeSquare = this.getLeftPipe(posX, posY)

        if (!currentPipeSquare) return list

        if (upPipeSquare !== null
            && this.adyacentPipeIsConnected(currentPipeSquare, this.getPipeAt(upPipeSquare.posX, upPipeSquare.posY), DIRECTION.UP)) {
            list.push(upPipeSquare)
        }
        if (rightPipeSquare !== null
            && this.adyacentPipeIsConnected(currentPipeSquare, this.getPipeAt(rightPipeSquare.posX, rightPipeSquare.posY), DIRECTION.RIGHT)) {
            list.push(rightPipeSquare)
        }
        if (downPipeSquare !== null
            && this.adyacentPipeIsConnected(currentPipeSquare, this.getPipeAt(downPipeSquare.posX, downPipeSquare.posY), DIRECTION.DOWN)) {
            list.push(downPipeSquare)
        }
        if (leftPipeSquare !== null
            && this.adyacentPipeIsConnected(currentPipeSquare, this.getPipeAt(leftPipeSquare.posX, leftPipeSquare.posY), DIRECTION.LEFT)) {
            list.push(leftPipeSquare)
        }
        return list
    }

    evaluateTileAtPos(posX: number, posY: number, visitedPipes: PipeSquare[]) {
        const pipeSquare = this.getPipeAt(posX, posY)
        pipeSquare.setIsConnected(true)
        visitedPipes.push(pipeSquare)
        const adyacentConnectedPipes = this.getAdyacenteConnectedPipes(posX, posY)

        const adyacentConnectedPipesToVisit = adyacentConnectedPipes.filter(currentPipeSquare => {
            for (let i = 0; i < visitedPipes.length; i++) {
                const visitedPipe = visitedPipes[i]
                if (visitedPipe.posX === currentPipeSquare.posX && visitedPipe.posY === currentPipeSquare.posY) {
                    return false
                }
            }
            return true
        })

        if (adyacentConnectedPipesToVisit.length === 0) { return true }
        adyacentConnectedPipesToVisit.forEach(currentPipeSquare => this.evaluateTileAtPos(currentPipeSquare.posX, currentPipeSquare.posY, visitedPipes))
    }
}