import { useEffect, useState } from 'react'
import { GameAsistant } from '../entities/GameAsistant'
import { isMapAsString, levelPassword, parseMap, parseMapToPipeSquareMatrix } from '../utils/utils'

const n = 1
export const useGameAsistant = () => {

    const [squares, setSquares] = useState<string[][]>()
    const [asistant, setAsistant] = useState<GameAsistant>()

    useEffect(() => {
        fetch('../assets/map.txt')
            .then((r) => r.text())
            .then(text => {
                console.log(text);
                setSquares(parseMap(text))
            })
    }, [])

    useEffect(() => {
        if (squares)
            setAsistant(new GameAsistant(parseMapToPipeSquareMatrix(squares)))
    }, [squares])

    const handleClickPipe = (posX: number, posY: number) => {
        asistant?.rotateTile(posX, posY)
    }

    return {
        table: asistant?.matrix,
        handleClickPipe,
    }
}