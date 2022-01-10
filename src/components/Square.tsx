import { PipeSquareShape } from '../entities/types'

interface SquareProps {
  value: PipeSquareShape
  onClick: () => void
  isDisabled: boolean
}

const Square = ({ value, onClick, isDisabled = false }: SquareProps) => {
  return (
    <button className={`square ${isDisabled ? 'square--disabled' : ''}`} onClick={isDisabled ? () => { } : onClick}
      style={{
        color: value.isConnected ? 'blue' : 'red',
        cursor: 'pointer'
      }}>
      {value.shape}
    </button>
  );
}

export default Square