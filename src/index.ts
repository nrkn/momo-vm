import { compile } from './compile'
import { decompile } from './decompile'
import { detokenize } from './detokenise'
import { execute } from './execute'
import { parse } from './parse'

const MomoVM = {
  compile, decompile, detokenize, execute, parse
}

export = MomoVM
