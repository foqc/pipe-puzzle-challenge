import { PipeSquareShape } from '../entities/types'
import { Image, Rect } from 'react-konva'
import { stringToPipeImg } from '../utils/imageUtils'
import { useRef } from 'react'
import useImage from 'use-image'
import { PIPE_IMAGE_SIZE } from '../constants/Constants'

interface SquareProps {
  value: PipeSquareShape
  onClick: () => void
  isDisabled: boolean
  posX: number
  posY: number
}

const Square = ({ value, onClick, posX, posY }: SquareProps) => {
  const strImage = stringToPipeImg(value.shape, value.isConnected)
  const [image] = useImage(strImage)


  return (<>
    <Rect
      width={PIPE_IMAGE_SIZE}
      height={PIPE_IMAGE_SIZE}
      x={posY * PIPE_IMAGE_SIZE}
      y={posX * PIPE_IMAGE_SIZE}
      fill='transparent'
      stroke='#959595'
    />
    <Image
      image={image}
      width={PIPE_IMAGE_SIZE}
      height={PIPE_IMAGE_SIZE}
      x={posY * PIPE_IMAGE_SIZE}
      y={posX * PIPE_IMAGE_SIZE}
      onClick={onClick}
    />
  </>
  );
}

export default Square