import useCanvas from '../hooks/useCanvas'
import { useGame } from '../hooks/useGame'
import { useGameAsistant } from '../hooks/useGameAsistant'
import Canvas from './Canvas'
import Instructions from './Instructions'

const Game = () => {
    const {
        socketIsReady,
        initLevel, onVerify,
        levelPassword,
        stringMap, sendMoveCommands
    } = useGame()

    const {
        squareShapes, handleClickPipe,
        movementCommands, clearMovements
    } = useGameAsistant(stringMap)

    const { sourceCanvas } = useCanvas(squareShapes, handleClickPipe)

    const showLevels = (levels: number[]) => {
        return <div>
            {levels.map(level => <button key={level}
                className='btn btn--green' disabled={!socketIsReady || squareShapes.length > 0}
                onClick={() => initLevel(level)}>Start level {level}</button>)
            }
        </div>
    }

    return <div className='layout-grid'>
        <Instructions />
        <div className='col'>
            <div className='game-content'>
                <h2>Map</h2>
                <Canvas ref={sourceCanvas} width={10} height={10} />

                {showLevels([1, 2, 3, 4, 5, 6])}
                <button className='btn btn--blue' disabled={!socketIsReady} onClick={onVerify}>Verify</button>
                <button className='btn btn--blue' disabled={movementCommands.length === 0} onClick={() => {
                    sendMoveCommands(movementCommands)
                    clearMovements()
                }}>Sync Server Map</button>
                <p>
                    Level password: <span className={`txt--${levelPassword ? 'green' : 'red'}`}>{levelPassword ? levelPassword : 'Incorrect'}</span>
                </p>
                <h3>Commands pending to send</h3>
                {movementCommands?.map((command, idx) => <p key={command + idx}>{(idx + 1)}. {command}</p>)}
            </div>
        </div>
    </div >
}

export default Game