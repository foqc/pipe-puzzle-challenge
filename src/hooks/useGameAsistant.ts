import { useEffect, useState } from 'react'
import { GameAsistant } from '../entities/GameAsistant'
import { PipeSquareShape } from '../entities/types'
import { chunkCommand, fromPipeMatrixToString, fromPipeToPipeSquareShape, movementStatusToCommand, parseMap, parseMapToPipeShape, parsePipeShapeToPipeSquare } from '../utils/utils'

export const useGameAsistant = (mapString: string) => {

    const [squareShapes, setSquares] = useState<PipeSquareShape[][]>([])
    const [asistant, setAsistant] = useState<GameAsistant>()

    useEffect(() => {
        if (mapString?.length > 0 && !asistant)
            setSquares(parseMapToPipeShape(parseMap(mapString)))
    }, [mapString])

    useEffect(() => {
        if (squareShapes.length > 0 && !asistant)
            setAsistant(new GameAsistant(parsePipeShapeToPipeSquare(squareShapes)))
    }, [squareShapes])

    const handleClickPipe = (posX: number, posY: number) => {
        asistant?.rotateTile(posX, posY)
        let matrix: PipeSquareShape[][] = [...squareShapes]
        for (let row = 0; row < asistant!.rows; row++) {
            for (let col = 0; col < asistant!.cols; col++) {
                matrix[row][col] = fromPipeToPipeSquareShape(asistant!.matrix[row][col])
            }
        }

        setSquares(matrix)
    }

    const clearMovements = () => asistant!.clearMovements()

    return {
        squareShapes,
        handleClickPipe,
        movementCommands: chunkCommand(movementStatusToCommand(asistant?.movementStatus)),
        clearMovements
    }
}