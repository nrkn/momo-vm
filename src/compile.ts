import { Program } from './types'

export const compile = ( program: Program ) => {
  const { length } = program
  const offsets: number[] = []
  const instrs: number[] = []

  let i = 0

  program.forEach( instr => {
    offsets.push( i )
    instrs.push( ...instr )
    i += instr.length
  })

  const compiled = [ length, ...offsets, ...instrs ]

  return new Int32Array( compiled )
}
