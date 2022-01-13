import tShapePipeUp from '../assets/img/tShapePipeUp.png'
import tShapePipeRight from '../assets/img/tShapePipeRight.png'
import tShapePipeDown from '../assets/img/tShapePipeDown.png'
import tShapePipeLeft from '../assets/img/tShapePipeLeft.png'
import smallLinePipeUp from '../assets/img/smallLinePipeUp.png'
import smallLinePipeRight from '../assets/img/smallLinePipeRight.png'
import smallLinePipeDown from '../assets/img/smallLinePipeDown.png'
import smallLinePipeLeft from '../assets/img/smallLinePipeLeft.png'
import pipeElbowUp from '../assets/img/pipeElbowUp.png'
import pipeElbowRight from '../assets/img/pipeElbowRight.png'
import pipeElbowDown from '../assets/img/pipeElbowDown.png'
import pipeElbowLeft from '../assets/img/pipeElbowLeft.png'
import crossPipe from '../assets/img/crossPipe.png'
import largeLinePipeV from '../assets/img/largeLinePipeV.png'
import largeLinePipeH from '../assets/img/largeLinePipeH.png'

import tShapePipeUpAlt from '../assets/img/tShapePipeUp_alt.png'
import tShapePipeRightAlt from '../assets/img/tShapePipeRight_alt.png'
import tShapePipeDownAlt from '../assets/img/tShapePipeDown_alt.png'
import tShapePipeLeftAlt from '../assets/img/tShapePipeLeft_alt.png'
import smallLinePipeUpAlt from '../assets/img/smallLinePipeUp_alt.png'
import smallLinePipeRightAlt from '../assets/img/smallLinePipeRight_alt.png'
import smallLinePipeDownAlt from '../assets/img/smallLinePipeDown_alt.png'
import smallLinePipeLeftAlt from '../assets/img/smallLinePipeLeft_alt.png'
import pipeElbowUpAlt from '../assets/img/pipeElbowUp_alt.png'
import pipeElbowRightAlt from '../assets/img/pipeElbowRight_alt.png'
import pipeElbowDownAlt from '../assets/img/pipeElbowDown_alt.png'
import pipeElbowLeftAlt from '../assets/img/pipeElbowLeft_alt.png'
import crossPipeAlt from '../assets/img/crossPipe_alt.png'
import largeLinePipeVAlt from '../assets/img/largeLinePipeV_alt.png'
import largeLinePipeHAlt from '../assets/img/largeLinePipeH_alt.png'
import { ImageAssetTuple } from '../entities/types'

const CHAR_IMAGE_PIPE_MAP: Map<string, ImageAssetTuple> = new Map()
CHAR_IMAGE_PIPE_MAP.set('┳', [tShapePipeUp, tShapePipeUpAlt])
CHAR_IMAGE_PIPE_MAP.set('┫', [tShapePipeRight, tShapePipeRightAlt])
CHAR_IMAGE_PIPE_MAP.set('┻', [tShapePipeDown, tShapePipeDownAlt])
CHAR_IMAGE_PIPE_MAP.set('┣', [tShapePipeLeft, tShapePipeLeftAlt])
CHAR_IMAGE_PIPE_MAP.set('╹', [smallLinePipeUp, smallLinePipeUpAlt])
CHAR_IMAGE_PIPE_MAP.set('╺', [smallLinePipeRight, smallLinePipeRightAlt])
CHAR_IMAGE_PIPE_MAP.set('╻', [smallLinePipeDown, smallLinePipeDownAlt])
CHAR_IMAGE_PIPE_MAP.set('╸', [smallLinePipeLeft, smallLinePipeLeftAlt])
CHAR_IMAGE_PIPE_MAP.set('┗', [pipeElbowUp, pipeElbowUpAlt])
CHAR_IMAGE_PIPE_MAP.set('┏', [pipeElbowRight, pipeElbowRightAlt])
CHAR_IMAGE_PIPE_MAP.set('┛', [pipeElbowDown, pipeElbowDownAlt])
CHAR_IMAGE_PIPE_MAP.set('┓', [pipeElbowLeft, pipeElbowLeftAlt])
CHAR_IMAGE_PIPE_MAP.set('┃', [largeLinePipeH, largeLinePipeHAlt])
CHAR_IMAGE_PIPE_MAP.set('━', [largeLinePipeV, largeLinePipeVAlt])
CHAR_IMAGE_PIPE_MAP.set('╋', [crossPipe, crossPipeAlt])


export const stringToPipeImg = (pipeAsString: string, isConnected: boolean): string => {
    const pipeImg = CHAR_IMAGE_PIPE_MAP.get(pipeAsString)
    if (!pipeImg) return ''

    return isConnected ? pipeImg[1] : pipeImg[0]
}