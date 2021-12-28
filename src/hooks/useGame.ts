import { useEffect, useState } from 'react'
import { isMapAsString, parseMap } from '../utils/utils'
import { useSocket } from './useSocket'

const n = 8
export const useGame = () => {

    const {
        socketIsReady,
        handleClickSendMessage,
        response
    } = useSocket('wss://hometask.eg1236.com/game-pipes/')

    const [squares, setSquares] = useState(Array.from({ length: n }, () => Array.from({ length: n }, () => '')))

    useEffect(() => {
        const stringMap = response?.toString()
        if (isMapAsString(stringMap))
            setSquares(parseMap(stringMap))
    }, [response])

    const handleClick = (posX: number, posY: number) => {
        const newSqares = [...squares]
        newSqares[posX][posY] = '0'
        setSquares(newSqares)
    }

    return {
        squares,
        socketIsReady,
        handleClickSendMessage,
        handleClick
    }
}