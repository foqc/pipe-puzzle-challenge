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
        //square above would be y-1
        //square below is y+1
        //square to left is x-1;
        //square to right is x+1;
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                //set connected to false to begin with - logic will correct if truly connected
                this.matrix[x][y - 1].setIsConnected(false)
                this.matrix[x - 1][y].setIsConnected(false)
                //start with second row
                if (y > 0) {
                    //check if top of square matches bottom of square above it
                    if (this.matrix[x][y - 1].pipe.hasBottom && this.matrix[x][y].pipe.hasTop) {
                        this.matrix[x][y - 1].setIsConnected(true)
                        this.matrix[x][y - 1].setColor('blue')
                    }
                }
                //start with second column
                if (x > 0) {
                    //check to see if left of square matches right of square to left of it
                    if (this.matrix[x - 1][y].pipe.hasRight == this.matrix[x][y].pipe.hasLeft) {
                        this.matrix[x - 1][y].setIsConnected(true)
                        this.matrix[x - 1][y].setColor('blue')
                    }
                }
            }
        }
    }
}