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
        if (canvas) {
            setWidth(canvas!.width)
            setHeight(canvas!.height)
        }
    }, [canvas])


    useEffect(() => {
        if (width > 0 && height > 0 && pipesShape.length > 0) {
            drawBoard()
        }
    }, [pipesShape])

    useEffect(() => {
        if (canvas && pipesShape.length > 0)
            canvas.addEventListener('click', handleClick)
        return () => {
            if (canvas && pipesShape.length > 0)
                canvas.removeEventListener('click', handleClick)
        }
    }, [pipesShape, onClick])

    const clear = () => {
        context!.clearRect(0, 0, canvas!.width, canvas!.height)
    }

    const drawBoard = () => {
        clear()
        let row = 0
        const paddingX = canvas!.width / pipesShape.length
        const paddingY = canvas!.height / pipesShape[0].length

        for (let x = 0; x < width; x += paddingX, row++) {
            let col = 0
            for (let y = 0; y < height; y += paddingY, col++) {
                context!.strokeRect(
                    x + 10, y + 10,
                    x + paddingX >= width ? paddingX - 10 : paddingX,
                    y + paddingY >= height ? paddingY - 10 : paddingY
                )
                context!.fillStyle = pipesShape[col][row].isConnected ? 'blue' : 'red'
                context!.font = '25px Arial'
                context!.fillText(pipesShape[col][row].shape, x + 18, y + 40)
            }
        }
        context!.lineWidth = 5
        context!.strokeStyle = 'black'
        context!.stroke()
    }

    const handleClick = (e: MouseEvent) => {
        const {
            x: offsetX,
            y: offsetY
        } = getMousePos(canvas!, e)

        const posX = Math.floor((offsetX / width) * pipesShape.length)
        const posY = Math.floor((offsetY / height) * pipesShape[0].length)

        onClick(posY, posX)
    }

    return {
        sourceCanvas
    }
}

export default useCanvas