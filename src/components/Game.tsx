import { FIRST_LEVEL_COMMAND, GET_MAP_COMMAND, PUZZLE_COMMANDS, VERIFY_COMMAND } from '../constants/Constants'
import { useGame } from '../hooks/useGame'
import { useGameAsistant } from '../hooks/useGameAsistant'
import Board from './Board'

const Game = () => {
    const {
        squares, socketIsReady,
        handleClickSendMessage,
        handleClick, levelPassword
    } = useGame()

    const {squareShapes, handleClickPipe, onVerify} = useGameAsistant()
    return <>
        <button disabled={!socketIsReady} onClick={() => {
            handleClickSendMessage(PUZZLE_COMMANDS.get(FIRST_LEVEL_COMMAND))
            handleClickSendMessage(PUZZLE_COMMANDS.get(GET_MAP_COMMAND))
        }}>First Level</button><br />
        <button disabled={!socketIsReady} onClick={() =>
            handleClickSendMessage(PUZZLE_COMMANDS.get(VERIFY_COMMAND))
        }>Verify</button><br />
        password: {levelPassword}
        <div className="game">
            <div className="game-board">
                <Board squares={squares} onClick={(x, y) => handleClick(x, y)} />
            </div>
        </div>
        Second map: 
        <div className="game">
            <div className="game-board">
                <Board squares={squareShapes} onClick={(x, y) => handleClickPipe(x, y)} />
            </div>
            <button onClick={onVerify}>Verify</button><br />
        </div>
    </>
}

export default Game