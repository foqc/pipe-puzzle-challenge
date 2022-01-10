import { PipeSquareShape } from '../entities/types'
import { useGame } from '../hooks/useGame'
import { useGameAsistant } from '../hooks/useGameAsistant'
import Board from './Board'

const Game = () => {
    const {
        squares, socketIsReady,
        initLevel, onVerify,
        handleClick, levelPassword,
        stringMap, sendMoveCommands
    } = useGame()

    const {
        squareShapes, handleClickPipe,
        printInConsoleStatus, movementCommands,
        clearMovements
    } = useGameAsistant(stringMap)

    const showGameBoard = (board: Array<Array<PipeSquareShape>>, handleClick: Function) => <div className="game">
        <div className="game-board">
            {board.length > 0 && <Board squares={board} onClick={(x, y) => handleClick(x, y)} />}
            {board.length === 0 && <p>Please start a level</p>}
        </div>
    </div>

    return <div className='layout-grid'>
        <div className='col-half'>
            <h2>Server Map</h2>
            {showGameBoard(squares, handleClick)}
            <button disabled={!socketIsReady} onClick={() => initLevel(1)}>Start first level</button>
            <button disabled={!socketIsReady} onClick={onVerify}>Verify</button>
            password: {levelPassword}
        </div>
        <div className='col-half'>
            <h2>Local Map</h2>
            {showGameBoard(squareShapes, handleClickPipe)}
            <button disabled={squares.length === 0} onClick={printInConsoleStatus}>Print map in console</button>
            <button disabled={movementCommands.length === 0} onClick={() => {
                sendMoveCommands(movementCommands)
                clearMovements()
            }}>Send commands</button>
            <h3>Commands pending to send</h3>
            {movementCommands?.map((command, idx) => <p key={idx}>{(idx + 1)}. {command}</p>)}
        </div>
    </div>
}

export default Game