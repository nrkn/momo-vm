import { executors } from './executors'
import { Program } from './types'

export const execute = ( program: Program, memory: Int8Array ) => {
  const { length } = program
  let counter = 0
  let i = 0

  while( counter < length ){
    const [ instr, ...args ] = program[ counter ]

    const jumpLocation = executors[ instr ]( memory, ...args )

    if( jumpLocation === undefined ) {
      counter++
    } else if( jumpLocation === -1 ) {
      counter = length
    } else {
      counter = jumpLocation
    }

    i++
    if( i === 256 ) {
      throw Error( 'Too many operations' )
    }
  }
}
