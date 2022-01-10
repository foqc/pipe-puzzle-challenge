import { useEffect, useState } from 'react'
import { GameAsistant } from '../entities/GameAsistant'
import { PipeSquareShape } from '../entities/types'
import { chunkCommand, fromPipeMatrixToString, fromPipeToPipeSquareShape, isMapAsString, levelPassword, movementStatusToCommand, parseMap, parseMapToPipeShape, parsePipeShapeToPipeSquare } from '../utils/utils'
// import mapString from '../assets/map'

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

    const printInConsoleStatus = () => {
        const stringMatrix = fromPipeMatrixToString(asistant!.matrix)
        let matrixResult = ''
        for (let row = 0; row < asistant!.rows; row++) {
            for (let col = 0; col < asistant!.cols; col++) {
                matrixResult += stringMatrix[row][col]
            }
            matrixResult += '\n'
        }

        console.log(matrixResult)
    }

    return {
        squareShapes,
        handleClickPipe,
        printInConsoleStatus,
        movementCommands: chunkCommand(movementStatusToCommand(asistant?.movementStatus))
    }
}