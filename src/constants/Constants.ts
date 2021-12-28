export const HELP_COMMAND = 'HELP_COMMAND'
export const FIRST_LEVEL_COMMAND = 'FIRST_LEVEL_COMMAND'
export const GET_MAP_COMMAND = 'GET_MAP_COMMAND'
export const ROTATE_COMMAND = 'ROTATE_COMMAND'

export const PUZZLE_COMMANDS: Map<string, string> = new Map()
PUZZLE_COMMANDS.set(HELP_COMMAND, 'help')
PUZZLE_COMMANDS.set(FIRST_LEVEL_COMMAND, 'new 1')
PUZZLE_COMMANDS.set(GET_MAP_COMMAND, 'map')
PUZZLE_COMMANDS.set(ROTATE_COMMAND, 'rotate')