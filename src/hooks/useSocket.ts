import { useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

export const useSocket = (url: string) => {
    const {
        sendMessage,
        lastMessage,
        readyState,
    } = useWebSocket(url)

    const handleClickSendMessage = useCallback((msg) => sendMessage(msg), [])

    return {
        socketIsReady: readyState === ReadyState.OPEN,
        handleClickSendMessage,
        response: lastMessage ? lastMessage.data : null
    }

}