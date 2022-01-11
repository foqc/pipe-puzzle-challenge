import { PipeSquareShape } from '../entities/types'
import useCanvas from '../hooks/useCanvas'
import { useGame } from '../hooks/useGame'
import { useGameAsistant } from '../hooks/useGameAsistant'
import Board from './Board'
import Canvas from './Canvas'
import Instructions from './Instructions'

const Game = () => {
    const {
        squares, socketIsReady,
        initLevel, onVerify,
        levelPassword,
        stringMap, sendMoveCommands
    } = useGame()

    const {
        squareShapes, handleClickPipe,
         movementCommands,       clearMovements
    } = useGameAsistant(stringMap)

    const { sourceCanvas } = useCanvas(squareShapes, handleClickPipe)

    return <div className='layout-grid'>
        <Instructions />
        <div className='col'>
            <div className='game-content'>
                <h2>Map</h2>
                <Canvas ref={sourceCanvas} width={10} height={10} />

                <button className='btn btn--green' disabled={!socketIsReady || squares.length > 0} onClick={() => initLevel(3)}>Start first level</button>
                <button className='btn btn--blue' disabled={!socketIsReady} onClick={onVerify}>Verify</button>
                <button className='btn btn--blue' disabled={movementCommands.length === 0} onClick={() => {
                    sendMoveCommands(movementCommands)
                    clearMovements()
                }}>Sync Server Map</button>
                <p>
                    Level password: <span className={`txt--${levelPassword ? 'green' : 'red'}`}>{levelPassword ? levelPassword : 'Incorrect'}</span>
                </p>
                <h3>Commands pending to send</h3>
                {movementCommands?.map((command, idx) => <p key={idx}>{(idx + 1)}. {command}</p>)}
            </div>
        </div>
    </div >
}

export default Game