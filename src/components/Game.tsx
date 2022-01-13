import { useState } from 'react'
import { Layer, Stage } from 'react-konva'
import { PIPE_IMAGE_SIZE } from '../constants/Constants'
import useCanvas from '../hooks/useCanvas'
import { useGame } from '../hooks/useGame'
import { useGameAsistant } from '../hooks/useGameAsistant'
import Board from './Board'
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

    /**
     * [showVanillaCanvas, sourceCanvas] options were added to show you how 
     * I use a vanilla Canvas 2D (this was added before konva library)
     */
    const [showVanillaCanvas, _] = useState(false)
    const { sourceCanvas } = useCanvas(squareShapes, handleClickPipe)

    const showLevels = (levels: number[]) => {
        return <div>
            {levels.map(level => <button key={level}
                className='btn btn--green' disabled={!socketIsReady || squareShapes.length > 0}
                onClick={() => initLevel(level)}>Start level {level}</button>)
            }
        </div>
    }

    const HEIGHT = PIPE_IMAGE_SIZE * squareShapes.length
    const WIDTH = PIPE_IMAGE_SIZE * squareShapes[0]?.length
    return <div className='layout-grid'>
        <Instructions />
        <div className='col'>
            <div className='game-content'>
                <h2>Map</h2>
                {!showVanillaCanvas && <Stage width={WIDTH} height={HEIGHT}>
                    <Layer>
                        <Board squares={squareShapes} onClick={handleClickPipe} isDisabled={false} />
                    </Layer>
                </Stage>}
                {showVanillaCanvas && <Canvas ref={sourceCanvas} width={10} height={10} />}

                {showLevels([1, 2, 3, 4, 5, 6])}
                <button className='btn btn--blue' disabled={!socketIsReady || movementCommands.length === 0} onClick={() => {
                    sendMoveCommands(movementCommands)
                    clearMovements()
                    onVerify()
                }}>Verify</button>
                <p>
                    Level password: <span className={`txt--${levelPassword ? 'green' : 'red'}`}>{levelPassword ? levelPassword : 'Incorrect'}</span>
                </p>
            </div>
        </div>
    </div >
}

export default Game