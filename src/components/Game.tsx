import { FIRST_LEVEL_COMMAND, GET_MAP_COMMAND, PUZZLE_COMMANDS, VERIFY_COMMAND } from '../constants/Constants'
import { useGame } from '../hooks/useGame'
import { useGameAsistant } from '../hooks/useGameAsistant'
import Board from './Board'

const Game = () => {
    const {
        squares, socketIsReady,
        handleClickSendMessage,
        handleClick, levelPassword,
        stringMap
    } = useGame()

    const { squareShapes, handleClickPipe, printInConsoleStatus, movementCommands } = useGameAsistant(stringMap)
    return <>
        <button disabled={!socketIsReady} onClick={() => {
            handleClickSendMessage(PUZZLE_COMMANDS.get(FIRST_LEVEL_COMMAND))
            handleClickSendMessage(PUZZLE_COMMANDS.get(GET_MAP_COMMAND))
        }}>First Level</button><br />
        <button disabled={!socketIsReady} onClick={() =>
            handleClickSendMessage(PUZZLE_COMMANDS.get(VERIFY_COMMAND))
        }>Verify</button><br />
        password: {levelPassword}
        <h2>First Map</h2>
        <div className="game">
            <div className="game-board">
                {squares.length > 0 && <Board squares={squares} onClick={(x, y) => handleClick(x, y)} />}
                {squares.length === 0 && <p>Please start first level</p>}
            </div>
        </div>
        <h2>Second Map</h2>
        <div className="game">
            <div className="game-board">
                {squares.length > 0 && <Board squares={squareShapes} onClick={(x, y) => handleClickPipe(x, y)} />}
                {squares.length === 0 && <p>Please start first level</p>}
            </div>
        </div>
        <button disabled={squares.length === 0} onClick={printInConsoleStatus}>Print status in console</button><br />
        {movementCommands?.map((command, idx) => <p key={idx}>{(idx + 1)}. {command}</p>)}
    </>
}

export default Game