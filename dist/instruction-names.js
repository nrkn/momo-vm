"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructionNames = [
    'prog', 'add', 'sub', 'inc', 'dec', 'copy', 'jmp', 'jmpz', 'jmpn', 'jmpe', 'jmpl',
    'halt', 'call'
];
exports.PROG = exports.instructionNames.indexOf('prog');
exports.ADD = exports.instructionNames.indexOf('add');
exports.SUB = exports.instructionNames.indexOf('sub');
exports.INC = exports.instructionNames.indexOf('inc');
exports.DEC = exports.instructionNames.indexOf('dec');
exports.COPY = exports.instructionNames.indexOf('copy');
exports.JMP = exports.instructionNames.indexOf('jmp');
exports.JMPZ = exports.instructionNames.indexOf('jmpz');
exports.JMPN = exports.instructionNames.indexOf('jmpn');
exports.JMPE = exports.instructionNames.indexOf('jmpe');
exports.JMPL = exports.instructionNames.indexOf('jmpl');
exports.HALT = exports.instructionNames.indexOf('halt');
exports.CALL = exports.instructionNames.indexOf('call');
exports.argTypes = {
    [exports.PROG]: ['number', 'number'],
    [exports.ADD]: ['location', 'number', 'location', 'number'],
    [exports.SUB]: ['location', 'number', 'location', 'number'],
    [exports.INC]: ['location', 'number'],
    [exports.DEC]: ['location', 'number'],
    [exports.COPY]: ['location', 'number', 'location', 'number'],
    [exports.JMP]: ['location', 'number'],
    [exports.JMPZ]: ['location', 'number', 'location', 'number'],
    [exports.JMPN]: ['location', 'number', 'location', 'number'],
    [exports.JMPE]: ['location', 'number', 'location', 'number', 'location', 'number'],
    [exports.JMPL]: ['location', 'number', 'location', 'number', 'location', 'number'],
    [exports.HALT]: [],
    [exports.CALL]: ['location', 'number', 'location', 'number', 'location', 'number']
};
//# sourceMappingURL=instruction-names.js.map