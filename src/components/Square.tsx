import { PipeSquareShape } from '../entities/types'

interface SquareProps {
  value: PipeSquareShape
  onClick: () => void
}

const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button className='square' onClick={onClick} style={{ backgroundColor: value.color }}>
      {value.shape}
    </button>
  );
}

export default Square