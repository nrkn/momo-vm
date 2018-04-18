import { executors } from './executors'
import { Program } from './types'

export const execute = ( program: Program, memory: Int32Array ) => {
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
    // arbitrary
    if ( i === 65536 ) {
      throw Error( 'Too many operations' )
    }
  }
}
