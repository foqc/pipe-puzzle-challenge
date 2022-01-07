import { getPipeSidesArray } from '../utils/utils'
import { PipeSquare } from './types'

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
        this.evaluateTiles()
    }

    adyacentPipeIsConnected(pipeSquare: PipeSquare, waterSources: PipeSquare[][], row: number, col: number): boolean {
        if (row + 1 < this.rows) {
            return (pipeSquare.pipe.hasBottom && waterSources[row + 1][col].pipe.hasTop)
        }
        if (row - 1 > 0) {
            return (pipeSquare.pipe.hasTop && waterSources[row - 1][col].pipe.hasBottom)
        }
        if (col + 1 < this.cols) {
            return (pipeSquare.pipe.hasRight && waterSources[row][col + 1].pipe.hasLeft)
        }
        if (col - 1 > 0) {
            return (pipeSquare.pipe.hasLeft && waterSources[row][col - 1].pipe.hasRight)
        }

        return false
    }

    getAdyacentPipes(pipeSquare: PipeSquare | undefined, waterSources: PipeSquare[][]): PipeSquare[] {
        if (!pipeSquare) return []
        const pipes: PipeSquare[] = []
        const row = pipeSquare.posX
        const col = pipeSquare.posY
        if (row + 1 < this.rows) {
            pipes.push(waterSources[row + 1][col])
        }
        if (row - 1 > 0) {
            pipes.push(waterSources[row - 1][col])
        }
        if (col + 1 < this.cols) {
            pipes.push(waterSources[row][col + 1])
        }
        if (col - 1 > 0) {
            pipes.push(waterSources[row][col - 1])
        }
        return pipes
    }

    pipesAreConnected(source: PipeSquare, target: PipeSquare) {
        return source.pipe.hasBottom && target.pipe.hasTop
            || source.pipe.hasTop && target.pipe.hasBottom
            || source.pipe.hasLeft && target.pipe.hasRight
            || source.pipe.hasRight && target.pipe.hasLeft
    }

    isWrongPlacesFirstLastColRow(x: number, y: number) {
        return (x === 0 && this.matrix[x][y].pipe.hasTop)
            || (x === this.rows - 1 && this.matrix[x][y].pipe.hasBottom)
            || (y === 0 && this.matrix[x][y].pipe.hasLeft)
            || (y === this.cols - 1 && this.matrix[x][y].pipe.hasRight)
    }

    evaluateTiles(): void {
        const pipesWithWaterToProcess: Array<PipeSquare> = []
        const waterSources: PipeSquare[][] = this.matrix

        // pipesWithWaterToProcess.push(waterSources[0][0])
        // waterSources[0][0].setIsConnected(true)
        // console.log('here..... ', waterSources)
        waterSources.forEach((rows, row) => {
            rows.forEach((pipeSquare, col) => {
                if (this.adyacentPipeIsConnected(pipeSquare, waterSources, row, col)) {
                    if (!pipeSquare.isConnected) {
                        pipesWithWaterToProcess.push(pipeSquare)
                        pipeSquare.setIsConnected(true)
                    }
                }
            })
        });

        let TEST_COUNT = 0
        while (pipesWithWaterToProcess.length && TEST_COUNT < 1000) {
            const currentPipe = pipesWithWaterToProcess.pop()

            console.log(TEST_COUNT, ' poping.... ', currentPipe, pipesWithWaterToProcess.length)
            TEST_COUNT++
            console.log('adyacent pipes: ', this.getAdyacentPipes(currentPipe, waterSources))
            this.getAdyacentPipes(currentPipe, waterSources).forEach(adyacentPipeSquare => {

                if (this.pipesAreConnected(currentPipe!, adyacentPipeSquare)) {
                    adyacentPipeSquare.setIsConnected(false)
                    if (!adyacentPipeSquare.isConnected) {
                        // const { pipe, isConnected, color, posX, posY } = adyacentPipeSquare
                        // const newAdyacentPipeSquare: PipeSquare = new PipeSquare({ ...pipe }, isConnected, color, posX, posY)
                        adyacentPipeSquare.setIsConnected(true)
                        pipesWithWaterToProcess.push(adyacentPipeSquare)
                    }
                }
            });
        }
    }
}