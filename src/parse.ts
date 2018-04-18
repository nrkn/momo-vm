import { instructionNames } from './instruction-names'
import { DIRECT, VALUE, INDIRECT } from './location-names'

export const parse = ( str: string ) => {
  const segs = str.split( /\s+/ ).filter( s => s !== '' )
  const lines: Int32Array[] = []

  let line: number[] = []
  let currentInstr: string

  segs.forEach( ( seg, i ) => {
    if ( instructionNames.includes( seg ) ) {
      currentInstr = seg

      if ( i > 0 ) {
        lines.push( new Int32Array( line ) )
        line = []
      }

      line.push( instructionNames.indexOf( seg ) )
    } else if ( /^\d+$/.test( seg ) ) {
      if ( currentInstr !== 'prog' ) {
        line.push( DIRECT )
      }
      line.push( Number( seg ) )
    } else if ( /^\$\d+$/.test( seg ) ) {
      line.push( VALUE )
      line.push( Number( seg.slice( 1 ) ) )
    } else if ( /^@\d+$/.test( seg ) ) {
      line.push( INDIRECT )
      line.push( Number( seg.slice( 1 ) ) )
    } else {
      throw Error( `Unexpected token: ${ seg }` )
    }
  })

  lines.push( new Int32Array( line ) )

  return lines
}
