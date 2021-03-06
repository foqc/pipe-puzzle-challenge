import { useEffect, useState } from 'react'
import { START_LEVEL_COMMAND, GET_MAP_COMMAND, PUZZLE_COMMANDS, ROTATE_COMMAND, VERIFY_COMMAND } from '../constants/Constants'
import { isMapAsString, levelPassword } from '../utils/utils'
import { useSocket } from './useSocket'

export const useGame = () => {

    const {
        socketIsReady,
        handleClickSendMessage,
        response
    } = useSocket('wss://hometask.eg1236.com/game-pipes/')

    const [stringMap, setStringMap] = useState('')

    useEffect(() => {
        const stringMap = response?.toString()
        if (isMapAsString(stringMap)) {
            setStringMap(stringMap)
        }
    }, [response])

    const handleClick = (posX: number, posY: number) => {
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(ROTATE_COMMAND)} ${posY} ${posX}`)
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(GET_MAP_COMMAND)}`)
    }

    const sendMoveCommands = (commands: string[]) => {
        if (commands?.length === 0) return
        commands.forEach(cmd => {
            handleClickSendMessage(cmd)
        })
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(GET_MAP_COMMAND)}`)
    }

    const initLevel = (level: number) => {
        if (level < 0 || level > 6) throw Error(`${level} level not exist! There are only 6 levels.`)
        handleClickSendMessage(`${PUZZLE_COMMANDS.get(START_LEVEL_COMMAND)} ${level}`)
        handleClickSendMessage(PUZZLE_COMMANDS.get(GET_MAP_COMMAND))
    }

    const onVerify = () => {
        handleClickSendMessage(PUZZLE_COMMANDS.get(VERIFY_COMMAND))
    }

    return {
        socketIsReady,
        initLevel,
        handleClick,
        levelPassword: levelPassword(response),
        stringMap,
        sendMoveCommands,
        onVerify
    }
}