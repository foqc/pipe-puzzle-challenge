import { Pipe, PipeSquare } from '../entities/types'

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

export const parsePipe = (map: string): Pipe => {
    switch (map) {
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
            return ({ hasTop: true, hasRight: true, hasBottom: true, hasLeft: true })
    }
}

export const parseMapToPipeSquareMatrix = (matrix: string[][]): PipeSquare[][] => {
    return matrix.map(rows => rows.map(item => new PipeSquare(parsePipe(item), false, 'red')))
}

export const fromPipeToString = (pipe: Pipe) => {

    if(pipe.ha)
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
    hasLeft: sides[2],
    hasBottom: sides[3],
})