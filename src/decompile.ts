import { MachineCode, Program } from './types'

export const decompile = ( machineCode: MachineCode ) => {
  const [ length, ...rest ] = machineCode
  const offsets = rest.slice( 0, length )
  const instrs = rest.slice( length )
  const program: Program = []

  for( let i = 0; i < length; i++ ) {
    const offset = offsets[ i ]
    let instrLen: number | undefined

    if( i < length - 1 ) {
      const nextOffset = offsets[ i + 1 ]
      instrLen = nextOffset - offset
    }

    const instr = instrLen ?
      instrs.slice( offset, offset + instrLen ) :
      instrs.slice( offset )

    program.push( new Int32Array( instr ) )
  }

  return program
}
