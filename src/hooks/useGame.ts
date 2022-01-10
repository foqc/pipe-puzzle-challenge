import { useEffect, useState } from 'react'
import { GET_MAP_COMMAND, PUZZLE_COMMANDS, ROTATE_COMMAND } from '../constants/Constants'
import { PipeSquareShape } from '../entities/types'
import { isMapAsString, levelPassword, parseMap, parseMapToPipeShape } from '../utils/utils'
import { useSocket } from './useSocket'

export const useGame = () => {

    const {
        socketIsReady,
        handleClickSendMessage,
        response
    } = useSocket('wss://hometask.eg1236.com/game-pipes/')

    const [squares, setSquares] = useState<PipeSquareShape[][]>([])
    const [stringMap, setStringMap] = useState('')

    useEffect(() => {
        const stringMap = response?.toString()
        console.log("🚀 returned status: ", stringMap)
        if (isMapAsString(stringMap)) {
            setSquares(parseMapToPipeShape(parseMap(stringMap)))
            setStringMap(stringMap)
        }
    }, [response])

    const handleClick = (posX: number, posY: number) => {
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(ROTATE_COMMAND)} ${posY} ${posX}`)
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(GET_MAP_COMMAND)}`)
    }

    return {
        squares,
        socketIsReady,
        handleClickSendMessage,
        handleClick,
        levelPassword: levelPassword(response),
        stringMap
    }
}