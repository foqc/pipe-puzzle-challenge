import { useEffect, useState } from 'react'
import { GET_MAP_COMMAND, PUZZLE_COMMANDS, ROTATE_COMMAND } from '../constants/Constants'
import { isMapAsString, parseMap } from '../utils/utils'
import { useSocket } from './useSocket'

const n = 1
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
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(ROTATE_COMMAND)} ${posY} ${posX}`)
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(GET_MAP_COMMAND)}`)
    }

    return {
        squares,
        socketIsReady,
        handleClickSendMessage,
        handleClick
    }
}