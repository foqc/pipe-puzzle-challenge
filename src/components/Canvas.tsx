import { forwardRef, MutableRefObject, useEffect, useState } from 'react'

interface CanvasProps {
    width: number
    height: number
}
const Canvas = ({ width, height }: CanvasProps, ref: any) => <canvas width={width} height={height} ref={ref} />

export default forwardRef(Canvas)