import { useEffect, useRef, useState } from 'react'
import { PipeSquareShape } from '../entities/types'
import { getMousePos } from '../utils/utils'

const useCanvas = (pipesShape: PipeSquareShape[][], onClick: Function) => {

    const [canvas, setCanvas] = useState<HTMLCanvasElement>()
    const [context, setContext] = useState<CanvasRenderingContext2D | null>()
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const sourceCanvas = useRef()

    useEffect(() => {
        if (sourceCanvas.current) {
            setCanvas(sourceCanvas.current)
            //@ts-ignore
            setContext(sourceCanvas.current.getContext('2d'))
        }
    })

    useEffect(() => {
        if (canvas && pipesShape.length > 0) {
            const factor = pipesShape.length < 10 ? 50 : pipesShape.length > 30 ? 30 : 70
            canvas.width = factor * pipesShape.length
            canvas.height = factor * pipesShape.length
            setWidth(canvas.width)
            setHeight(canvas.height)
        }
    }, [canvas, pipesShape])


    useEffect(() => {
        if (width > 0 && height > 0 && pipesShape.length > 0) {
            drawBoard()
        }
    })

    useEffect(() => {
        if (canvas && pipesShape.length > 0)
            canvas.addEventListener('click', handleClick)
        return () => {
            if (canvas && pipesShape.length > 0)
                canvas.removeEventListener('click', handleClick)
        }
    }, [pipesShape, onClick])

    const clear = () => {
        context!.clearRect(0, 0, width, height)
    }

    const drawBoard = () => {
        if (!context) throw Error('Context not found!')
        clear()
        let row = 0
        let col = 0
        const boxWidth = width / pipesShape.length
        const boxHeight = height / pipesShape[0].length
        const midBoxWidth = boxWidth / 2
        const midBoxHeight = boxHeight / 2

        for (let x = 0; x < width; x += boxWidth, row++) {
            col = 0
            for (let y = 0; y < height; y += boxHeight, col++) {
                context.strokeRect(y, x, boxHeight, boxWidth)
                context.fillStyle = pipesShape[row][col].isConnected ? 'blue' : 'red'
                context.font = `${boxWidth - midBoxWidth}px BlinkMacSystemFont`
                context.fillText(pipesShape[row][col].shape, y + midBoxHeight, x + midBoxWidth)
            }
        }
        context.lineWidth = 1
        context.strokeStyle = 'black'
        context.stroke()
    }

    const handleClick = (e: MouseEvent) => {
        const {
            x: offsetX,
            y: offsetY
        } = getMousePos(canvas!, e)

        const posX = Math.floor((offsetY / width) * pipesShape.length)
        const posY = Math.floor((offsetX / height) * pipesShape[0].length)

        onClick(posX, posY)
    }

    return {
        sourceCanvas
    }
}

export default useCanvas