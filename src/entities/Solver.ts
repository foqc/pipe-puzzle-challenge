import { isCorner, isCrossPipe, isElbowPipe, isFirstCol, isFirstRow, isLargePipe, isLastCol, isLastRow, isSamePipe, isSmallLinePipe, isTpipe } from '../utils/utils'
import { ELBOW_PIPE, Pipe, T_PIPE } from './types'

export default class Solver {
    matrix: Pipe[][]
    rows: number
    cols: number


    constructor(matrix: Pipe[][]) {
        this.matrix = matrix
        this.rows = matrix.length
        this.cols = matrix[0].length
    }

    isPlacedCorrectly(pipe: Pipe, posX: number, posY: number): boolean {

        if (isSmallLinePipe(pipe) || isCrossPipe(pipe) || isLargePipe(pipe)) return true

        if (posX === 0 && posY === 0) {
            if (isElbowPipe(pipe)) return pipe === ELBOW_PIPE.Down

            if (isTpipe(pipe)) return pipe === T_PIPE.Right
        }
        if (posX === 0 && posY === this.cols - 1) {
            if (isElbowPipe(pipe)) return pipe === ELBOW_PIPE.Left

            if (isTpipe(pipe)) return pipe === T_PIPE.Left
        }
        if (posX === this.rows - 1 && posY === 0) {
            if (isElbowPipe(pipe)) return pipe === ELBOW_PIPE.Right

            if (isTpipe(pipe)) return pipe === T_PIPE.Right
        }
        if (posX === this.rows - 1 && posY === this.cols - 1) {
            if (isElbowPipe(pipe)) return pipe === ELBOW_PIPE.Up

            if (isTpipe(pipe)) return pipe === T_PIPE.Left
        }
        if (isFirstRow(posX)) {
            return pipe === ELBOW_PIPE.Left || pipe === ELBOW_PIPE.Down || pipe === T_PIPE.Down
        }
        if (isFirstCol(posY)) {
            return pipe === ELBOW_PIPE.Left || pipe === ELBOW_PIPE.Down || pipe === T_PIPE.Right
        }

        if (isLastRow(posX, this.rows)) {
            return pipe === ELBOW_PIPE.Left || pipe === ELBOW_PIPE.Up || pipe === ELBOW_PIPE.Right || pipe === T_PIPE.Up
        }
        if (isLastCol(posY, this.cols)) {
            return pipe === ELBOW_PIPE.Left || pipe === ELBOW_PIPE.Up || pipe === ELBOW_PIPE.Right || pipe === T_PIPE.Left
        }

        return false
    }

    isTarget() {

    }

    solve(start: Pipe[][]) {

    }
}