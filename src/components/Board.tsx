import { PipeSquareShape } from '../entities/types'
import Square from './Square'

interface BoardProps {
    squares: Array<Array<PipeSquareShape>>
    onClick: (posX: number, posY: number) => void
    isDisabled: boolean
}

const Board = ({ squares, onClick, isDisabled }: BoardProps) => {
    const renderSquare = (posX: number, posY: number) => <Square
        key={`${posX}_${posY}`}
        value={squares[posX][posY]}
        isDisabled={isDisabled}
        posX={posX}
        posY={posY}
        onClick={() => onClick(posX, posY)} />

    const renderRow = (posX: number) => <div key={`${posX}_`} className="board-row">
        {squares[posX].map((_, index) => renderSquare(posX, index))}
    </div>

    return <>
        {squares.map((_, index) => renderRow(index))}
    </>
}

export default Board