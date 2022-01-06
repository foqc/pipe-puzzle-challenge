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

    evaluateTiles(): void {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {

                if (x === 0 || y === 0 || x === this.rows - 1 || y === this.cols - 1) {
                    if ((x === 0 && this.matrix[x][y].pipe.hasTop)
                        || (x === this.rows - 1 && this.matrix[x][y].pipe.hasBottom)
                        || (y === 0 && this.matrix[x][y].pipe.hasLeft)
                        || (y === this.cols - 1 && this.matrix[x][y].pipe.hasRight)) {
                        this.matrix[x][y].setIsConnected(false)
                        this.matrix[x][y].setColor('red')
                    } else
                        this.matrix[x][y].setColor('blue')
                }

                if (x > 0) {
                    this.matrix[x - 1][y].setIsConnected(false)
                    if (this.matrix[x - 1][y].pipe.hasBottom && this.matrix[x][y].pipe.hasTop) {
                        this.matrix[x - 1][y].setIsConnected(true)
                        this.matrix[x - 1][y].setColor('blue')
                    }
                }
                
                if (y > 1) {
                    this.matrix[x][y - 1].setIsConnected(false)
                    if (this.matrix[x][y - 1].pipe.hasRight == this.matrix[x][y].pipe.hasLeft) {
                        this.matrix[x][y - 1].setIsConnected(true)
                        this.matrix[x][y - 1].setColor('blue')
                    }
                }
            }
        }
    }
}