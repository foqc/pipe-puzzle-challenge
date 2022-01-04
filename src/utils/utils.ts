import { CROSS_PIPE, ELBOW_PIPE, LARGE_LINE_PIPE, Pipe, SMALL_LINE_PIPE, T_PIPE } from '../entities/types'

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