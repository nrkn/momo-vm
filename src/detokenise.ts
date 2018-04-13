import { instructionNames, argTypes } from './instruction-names'
import { VALUE, INDIRECT } from './location-names'
import { Program } from './types'

export const detokenize = ( program: Program ) =>
  program.map( instr => {
    const [ instrId, ...iArgs ] = instr
    const name = instructionNames[ instrId ]
    const types = argTypes[ instrId ]

    const args = iArgs.map( ( arg, i ) => {
      const type = types[ i ]
      const prevType = types[ i - 1 ]

      if( type === 'location' ) return ''

      if( prevType === 'location' ) {
        const locationType = iArgs[ i - 1 ]

        if( locationType === VALUE ) return '$' + arg
        if( locationType === INDIRECT ) return '@' + arg
      }

      return arg
    })

    return [ name, ...args ].filter( s => s !== '' ).join( ' ' )
  }).join( '\n' )
