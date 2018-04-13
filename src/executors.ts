import { decompile } from './decompile'
import { execute } from './execute'

import { DIRECT, INDIRECT, VALUE } from './location-names'

import {
  PROG, ADD, SUB, INC, DEC, COPY, JMP, JMPZ, JMPN, JMPE, JMPL, HALT, CALL
} from './instruction-names'

const getIndex = ( memory: Int8Array, location: number, arg: number ) => {
  if ( location === DIRECT ) return arg
  if ( location === INDIRECT ) return memory[ arg ]

  throw Error( 'Expected index location to be DIRECT or INDIRECT' )
}

const getValue = ( memory: Int8Array, location: number, arg: number ) => {
  if ( location === DIRECT ) return memory[ arg ]
  if ( location === VALUE ) return arg
  if ( location === INDIRECT ) return memory[ memory[ arg ] ]

  throw Error( 'Expected source location to be DIRECT, INDIRECT or VALUE' )
}

const setValue = ( memory: Int8Array, location: number, arg: number, value: number ) => {
  const index = getIndex( memory, location, arg )

  memory[ index ] = value
}

export interface Executors {
  [ instrId: number ]: ( memory: Int8Array, ...args: number[] ) => number | void
}

export const executors: Executors = {
  [ PROG ]: ( memory: Int8Array ) => { },
  [ ADD ]: ( memory: Int8Array, targetLocation, targetArg, sourceLocation, sourceArg ) => {
    const left = getValue( memory, targetLocation, targetArg )
    const right = getValue( memory, sourceLocation, sourceArg )

    setValue( memory, targetLocation, targetArg, left + right )
  },
  [ SUB ]: ( memory: Int8Array, targetLocation, targetArg, sourceLocation, sourceArg ) => {
    const left = getValue( memory, targetLocation, targetArg )
    const right = getValue( memory, sourceLocation, sourceArg )

    setValue( memory, targetLocation, targetArg, left - right )
  },
  [ INC ]: ( memory: Int8Array, targetLocation, targetArg ) => {
    const value = getValue( memory, targetLocation, targetArg )

    setValue( memory, targetLocation, targetArg, value + 1 )
  },
  [ DEC ]: ( memory: Int8Array, targetLocation, targetArg ) => {
    const value = getValue( memory, targetLocation, targetArg )

    setValue( memory, targetLocation, targetArg, value - 1 )
  },
  [ COPY ]: ( memory: Int8Array, targetLocation, targetArg, sourceLocation, sourceArg ) => {
    const value = getValue( memory, sourceLocation, sourceArg )

    setValue( memory, targetLocation, targetArg, value )
  },
  [ JMP ]: ( memory: Int8Array, lineLocation, lineArg ) => {
    const line = getValue( memory, lineLocation, lineArg )

    return line
  },
  [ JMPZ ]: ( memory: Int8Array, lineLocation, lineArg, compareLocation, compareArg ) => {
    const line = getValue( memory, lineLocation, lineArg )
    const value = getValue( memory, compareLocation, compareArg )

    if ( value === 0 ) return line
  },
  [ JMPN ]: ( memory: Int8Array, lineLocation, lineArg, compareLocation, compareArg ) => {
    const line = getValue( memory, lineLocation, lineArg )
    const value = getValue( memory, compareLocation, compareArg )

    if ( value < 0 ) return line
  },
  [ JMPE ]: ( memory: Int8Array, lineLocation, lineArg, leftLocation, leftArg, rightLocation, rightArg ) => {
    const line = getValue( memory, lineLocation, lineArg )
    const left = getValue( memory, leftLocation, leftArg )
    const right = getValue( memory, rightLocation, rightArg )

    if ( left === right ) return line
  },
  [ JMPL ]: ( memory: Int8Array, lineLocation, lineArg, leftLocation, leftArg, rightLocation, rightArg ) => {
    const line = getValue( memory, lineLocation, lineArg )
    const left = getValue( memory, leftLocation, leftArg )
    const right = getValue( memory, rightLocation, rightArg )

    if ( left < right ) return line
  },
  [ HALT ]: ( memory: Int8Array ) => -1,
  [ CALL ]: ( memory: Int8Array, programLocation, programArg, inboxLocation, inboxArg, outboxLocation, outboxArg ) => {
    const programStart = getIndex( memory, programLocation, programArg )
    const program = memory.slice( programStart )
    const decompiled = decompile( program )
    const [ [ , outSize, inSize ] ] = decompiled

    const inboxStart = getIndex( memory, inboxLocation, inboxArg )
    const inbox = memory.slice( inboxStart, inboxStart + inSize )

    const subMemory = new Int8Array( 256 )

    for ( let i = 0; i < inbox.length; i++ ) {
      subMemory[ i + outSize ] = inbox[ i ]
    }

    execute( decompiled, subMemory )

    const result = subMemory.slice( 0, outSize )
    const outboxStart = getIndex( memory, outboxLocation, outboxArg )

    for ( let i = 0; i < outSize; i++ ) {
      memory[ outboxStart + i ] = result[ i ]
    }
  }
}
