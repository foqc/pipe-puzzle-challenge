import { FIRST_LEVEL_COMMAND, GET_MAP_COMMAND, HELP_COMMAND, PUZZLE_COMMANDS } from '../constants/Constants'
import { useGame } from '../hooks/useGame'
import Board from './Board'

const Game = () => {
    const {
        squares, socketIsReady,
        handleClickSendMessage,
        handleClick
    } = useGame()
    return <>
        <button disabled={!socketIsReady} onClick={() =>
            handleClickSendMessage(PUZZLE_COMMANDS.get(HELP_COMMAND))
        }>Help</button><br />
        <button disabled={!socketIsReady} onClick={() => {
            handleClickSendMessage(PUZZLE_COMMANDS.get(FIRST_LEVEL_COMMAND))
            handleClickSendMessage(PUZZLE_COMMANDS.get(GET_MAP_COMMAND))
        }}>First Level</button><br />

        <div className="game">
            <div className="game-board">
                <Board squares={squares} onClick={(x, y) => handleClick(x, y)} />
            </div>
        </div>
    </>
}

export default Game