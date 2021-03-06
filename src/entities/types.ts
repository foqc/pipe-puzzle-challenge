export type PositionTuple = [positionX: number, positionY: number]

export type ImageAssetTuple = [original: string, alternative: string]

export enum DIRECTION {
    UP, RIGHT, DOWN, LEFT
}
export type Pipe = {
    hasTop: boolean
    hasRight: boolean
    hasLeft: boolean
    hasBottom: boolean
}

export type PipeSquareShape = {
    shape: string
    isConnected: boolean
    color: string
}