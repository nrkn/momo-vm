export const instructionNames = [
  'prog', 'add', 'sub', 'inc', 'dec', 'copy', 'jmp', 'jmpz', 'jmpn', 'jmpe', 'jmpl',
  'halt', 'call'
]

export const PROG = instructionNames.indexOf( 'prog' )
export const ADD = instructionNames.indexOf( 'add' )
export const SUB = instructionNames.indexOf( 'sub' )
export const INC = instructionNames.indexOf( 'inc' )
export const DEC = instructionNames.indexOf( 'dec' )
export const COPY = instructionNames.indexOf( 'copy' )
export const JMP = instructionNames.indexOf( 'jmp' )
export const JMPZ = instructionNames.indexOf( 'jmpz' )
export const JMPN = instructionNames.indexOf( 'jmpn' )
export const JMPE = instructionNames.indexOf( 'jmpe' )
export const JMPL = instructionNames.indexOf( 'jmpl' )
export const HALT = instructionNames.indexOf( 'halt' )
export const CALL = instructionNames.indexOf( 'call' )

export const argTypes = {
  [ PROG ]: [ 'number', 'number' ],
  [ ADD ]: [ 'location', 'number', 'location', 'number' ],
  [ SUB ]: [ 'location', 'number', 'location', 'number' ],
  [ INC ]: [ 'location', 'number' ],
  [ DEC ]: [ 'location', 'number' ],
  [ COPY ]: [ 'location', 'number', 'location', 'number' ],
  [ JMP ]: [ 'location', 'number' ],
  [ JMPZ ]: [ 'location', 'number', 'location', 'number' ],
  [ JMPN ]: [ 'location', 'number', 'location', 'number' ],
  [ JMPE ]: [ 'location', 'number', 'location', 'number', 'location', 'number' ],
  [ JMPL ]: [ 'location', 'number', 'location', 'number', 'location', 'number' ],
  [ HALT ]: [],
  [ CALL ]: [ 'location', 'number', 'location', 'number', 'location', 'number' ]
}
