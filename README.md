# momo-vm

A fictional VM running a fictional assembly language

Named after my cat, Momo

![Momo](/img/momo.jpg)

Very roughly based on [Little man computer](https://en.wikipedia.org/wiki/Little_man_computer), but:

- No accumulator or registers, just memory
- Only operates on signed 8 bit integers, overflow follows javascript Int8Array rules
- Has a call instruction that calls arbitrary code (so safe!) at a memory location, taking the inbox values from a specified memory location and storing the outbox at a specified memory location

I'm thinking about making a game that involves programming so I needed a VM for it

Has tests with 100% coverage and typescript typings

I'm too lazy to write full docs right now but if you're familiar with assembly you can figure out what the instructions are and do by looking at the code and tests

## install

`npm install momo-vm`

## example

```javascript
const { parse, execute } = require( 'momo-vm' )

/*
  asm must start with prog <outbox size> <inbox size>

  a number is a memory address eg 100 = memory[ 100 ]
  a number prefixed with $ is a numeric literal eg $100 = 100
  a number prefixed with @ is indirect memory access, eg @100 = memory[ memory[ 100 ] ]
*/
const sumInbox = `
prog 1 5
copy 6 $0
copy 7 $1
add 0 @7
inc 6
inc 7
jmpl $3 6 $5
`

const program = parse( sumInbox )

// the outbox (1 byte) followed by the inbox (5 bytes)
const memory = new Int8Array( [ 0, 2, 3, 4, 5, 6 ] )

execute( program, memory )

const result = memory[ 0 ]

console.log( result ) // 20
```

## roadmap

- more jump types? just for ease of use
  - jump positive
  - jump gt
  - jump gte/lte?
  - jump ne?
- more math
  - mult and div?
  - bitwise?
- extend to allow more types?
  - uint8, int16, uint16, int32, uint32, float32? - need extra math instructions
- track memory usage
- more asm syntax, comments, variable aliases etc
- different math ops for overflow / clamp / error
- better error handling
- debugger like http://nrkn.github.io/hrm-tools/
- make some of memory read only for eg a rom section
- add global and rom locations to allow:
  - screen, eg a canvas (writable)
  - keystate (read only)
- higher level language built on it - (implement tiny c? lol)
- compile to js?
- asm.js/wasm?

## license

MIT License

Copyright (c) 2018 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.