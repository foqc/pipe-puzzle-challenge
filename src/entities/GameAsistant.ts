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

    notAllowed(x: number, y: number) {
        if (x > 0) {
            const sides = getPipeSidesArray(this.matrix[x][y].pipe)
            const sides1 = getPipeSidesArray(this.matrix[x - 1][y].pipe)

            if (this.matrix[x][y].isSmallLinePipe(sides)
                && this.matrix[x - 1][y].isSmallLinePipe(sides1)) {

                if (this.matrix[x - 1][y].pipe.hasBottom && this.matrix[x][y].pipe.hasTop) {
                    this.matrix[x][y].setIsConnected(false)
                    this.matrix[x][y].setColor('blue')
                    this.matrix[x - 1][y].setIsConnected(false)
                    this.matrix[x - 1][y].setColor('blue')
                }
            }
        }

        if (y > 0) {
            const sides = getPipeSidesArray(this.matrix[x][y].pipe)
            const sides1 = getPipeSidesArray(this.matrix[x][y - 1].pipe)

            if (this.matrix[x][y].isSmallLinePipe(sides)
                && this.matrix[x][y - 1].isSmallLinePipe(sides1)) {

                if (this.matrix[x][y - 1].pipe.hasRight && this.matrix[x][y].pipe.hasLeft) {
                    this.matrix[x][y].setIsConnected(false)
                    this.matrix[x][y].setColor('blue')
                    this.matrix[x][y - 1].setIsConnected(false)
                    this.matrix[x][y - 1].setColor('blue')
                }
            }
        }
    }

    evaluateTiles(): void {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {

                if ((x === 0 && this.matrix[x][y].pipe.hasTop)
                    || (x === this.rows - 1 && this.matrix[x][y].pipe.hasBottom)
                    || (y === 0 && this.matrix[x][y].pipe.hasLeft)
                    || (y === this.cols - 1 && this.matrix[x][y].pipe.hasRight)) {
                    this.matrix[x][y].setIsConnected(false)
                    this.matrix[x][y].setColor('red')
                } else
                    this.matrix[x][y].setColor('blue')


                
                // this.notAllowed(x, y)
            }
        }
    }
}