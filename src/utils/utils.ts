import { Pipe, PipeSquare, PipeSquareShape } from '../entities/types'

const PIPE_SHAPES = ['┓', '┛', '┗', '┏', '╸', '╹', '╺', '╻', '━', '┃', '┣', '┳', '┫', '┻', '╋']

/**
 * 
 * @param map puzzle map as string, it has the next structure
 * map:
 * ┛┃╻┗╺╺┏╻
 * ┣╹╺╋┫┓┃╹
 * ┏┏┓┏━╻━━
 * ╹┳┳╻╹━┣┛
 * ━╻┻┣╻┳┣╺
 * ┏┓┃┓┫┻╹╺
 * ┗┳┳┓┛╋┓━
 * ╻┗┓╺╸┗━┏
 * 
 * @returns tensor of 2 dimensions
 */
export const parseMap = (map: string): Array<Array<string>> => {
    const rows = map?.split(/\r\n|\r|\n/)
    return rows?.slice(1, rows?.length - 1)?.map(row => row?.split('')?.map(item => item))
}

/**
 * 
 * @param matrix receives  the following map as matrix
 *  * ┛┃╻┗╺╺┏╻
 * ┣╹╺╋┫┓┃╹
 * ┏┏┓┏━╻━━
 * ╹┳┳╻╹━┣┛
 * ━╻┻┣╻┳┣╺
 * ┏┓┃┓┫┻╹╺
 * ┗┳┳┓┛╋┓━
 * ╻┗┓╺╸┗━┏
 * 
 * @returns a matrix parse to PipeSquareShape
 */
export const parseMapToPipeShape = (matrix: Array<Array<string>>): PipeSquareShape[][] => {
    return matrix.map(row => row.map(item => ({ shape: item, isConnected: false, color: 'red' })))
}

/**
 * 
 * @param pipeAsTring is one of the next pipes PIPE_SHAPES (see constant values)
 * 4 variables y Pipe type is used to represent elbow (┓), T (┳), crossed lines (╋), straight small (╹) and large (┃) lines.
 * @returns parsed Pipe type
 */
export const parsePipe = (pipeAsTring: string): Pipe => {
    switch (pipeAsTring) {
        case '┓':
            return ({ hasTop: false, hasRight: false, hasBottom: true, hasLeft: true })
        case '┛':
            return ({ hasTop: true, hasRight: false, hasBottom: false, hasLeft: true })
        case '┗':
            return ({ hasTop: true, hasRight: true, hasBottom: false, hasLeft: false })
        case '┏':
            return ({ hasTop: false, hasRight: true, hasBottom: true, hasLeft: false })

        case '╸':
            return ({ hasTop: false, hasRight: false, hasBottom: false, hasLeft: true })
        case '╹':
            return ({ hasTop: true, hasRight: false, hasBottom: false, hasLeft: false })
        case '╺':
            return ({ hasTop: false, hasRight: true, hasBottom: false, hasLeft: false })
        case '╻':
            return ({ hasTop: false, hasRight: false, hasBottom: true, hasLeft: false })

        case '━':
            return ({ hasTop: false, hasRight: true, hasBottom: false, hasLeft: true })
        case '┃':
            return ({ hasTop: true, hasRight: false, hasBottom: true, hasLeft: false })

        case '┣':
            return ({ hasTop: true, hasRight: true, hasBottom: true, hasLeft: false })
        case '┳':
            return ({ hasTop: false, hasRight: true, hasBottom: true, hasLeft: true })
        case '┫':
            return ({ hasTop: true, hasRight: false, hasBottom: true, hasLeft: true })
        case '┻':
            return ({ hasTop: true, hasRight: true, hasBottom: false, hasLeft: true })

        case '╋':
            return ({ hasTop: true, hasRight: true, hasBottom: true, hasLeft: true })
        default:
            throw Error(pipeAsTring + ' is not supported!');
    }
}

/**
 * 
 * @param matrix receives PipeSquareShape as matrix
 * @returns PipeSquare matrix
 * PipeSquareShape structure is used in view to paint content
 * PipeSquare structure represents string pipe as typed Pipe object and is used in Game assitant
 */
export const parsePipeShapeToPipeSquare = (matrix: PipeSquareShape[][]): PipeSquare[][] => {
    return matrix.map((rows, row) => rows.map((item, col) => new PipeSquare(parsePipe(item.shape), false, 'red', row, col)))
}

export const fromPipeMatrixToString = (matrix: PipeSquare[][]): string[][] => {
    return matrix.map(rows => rows.map(item => PIPE_SHAPES.find(shape => isSamePipe(item.pipe, parsePipe(shape))) || ''))
}

const isSamePipe = (source: Pipe, target: Pipe) => source.hasTop === target.hasTop && source.hasRight === target.hasRight
    && source.hasBottom === target.hasBottom && source.hasLeft === target.hasLeft

export const fromPipeToPipeSquareShape = (pipeSquare: PipeSquare): PipeSquareShape => {
    return { shape: PIPE_SHAPES.find(shape => isSamePipe(pipeSquare.pipe, parsePipe(shape))) || '', isConnected: pipeSquare.isConnected, color: pipeSquare.color }
}

/**
 * 
 * @param stringMap , see parseMap encoded documentation
 * @returns true if contains [map:] in the map encoded string
 */
export const isMapAsString = (stringMap: string): boolean => stringMap?.includes('map:')

export const levelPassword = (status: string): string => status?.toString()?.includes('Correct.') ? 'pass' : ''

export const getPipeSidesArray = (pipe: Pipe): boolean[] => [pipe.hasTop, pipe.hasRight, pipe.hasBottom, pipe.hasLeft]

export const fromArrayToPipe = (sides: boolean[]): Pipe => ({
    hasTop: sides[0],
    hasRight: sides[1],
    hasBottom: sides[2],
    hasLeft: sides[3],
})