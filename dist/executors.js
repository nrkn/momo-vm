"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decompile_1 = require("./decompile");
const execute_1 = require("./execute");
const location_names_1 = require("./location-names");
const instruction_names_1 = require("./instruction-names");
const getIndex = (memory, location, arg) => {
    if (location === location_names_1.DIRECT)
        return arg;
    if (location === location_names_1.INDIRECT)
        return memory[arg];
    throw Error('Expected index location to be DIRECT or INDIRECT');
};
const getValue = (memory, location, arg) => {
    if (location === location_names_1.DIRECT)
        return memory[arg];
    if (location === location_names_1.VALUE)
        return arg;
    if (location === location_names_1.INDIRECT)
        return memory[memory[arg]];
    throw Error('Expected source location to be DIRECT, INDIRECT or VALUE');
};
const setValue = (memory, location, arg, value) => {
    const index = getIndex(memory, location, arg);
    memory[index] = value;
};
exports.executors = {
    [instruction_names_1.PROG]: (memory) => { },
    [instruction_names_1.ADD]: (memory, targetLocation, targetArg, sourceLocation, sourceArg) => {
        const left = getValue(memory, targetLocation, targetArg);
        const right = getValue(memory, sourceLocation, sourceArg);
        setValue(memory, targetLocation, targetArg, left + right);
    },
    [instruction_names_1.SUB]: (memory, targetLocation, targetArg, sourceLocation, sourceArg) => {
        const left = getValue(memory, targetLocation, targetArg);
        const right = getValue(memory, sourceLocation, sourceArg);
        setValue(memory, targetLocation, targetArg, left - right);
    },
    [instruction_names_1.INC]: (memory, targetLocation, targetArg) => {
        const value = getValue(memory, targetLocation, targetArg);
        setValue(memory, targetLocation, targetArg, value + 1);
    },
    [instruction_names_1.DEC]: (memory, targetLocation, targetArg) => {
        const value = getValue(memory, targetLocation, targetArg);
        setValue(memory, targetLocation, targetArg, value - 1);
    },
    [instruction_names_1.COPY]: (memory, targetLocation, targetArg, sourceLocation, sourceArg) => {
        const value = getValue(memory, sourceLocation, sourceArg);
        setValue(memory, targetLocation, targetArg, value);
    },
    [instruction_names_1.JMP]: (memory, lineLocation, lineArg) => {
        const line = getValue(memory, lineLocation, lineArg);
        return line;
    },
    [instruction_names_1.JMPZ]: (memory, lineLocation, lineArg, compareLocation, compareArg) => {
        const line = getValue(memory, lineLocation, lineArg);
        const value = getValue(memory, compareLocation, compareArg);
        if (value === 0)
            return line;
    },
    [instruction_names_1.JMPN]: (memory, lineLocation, lineArg, compareLocation, compareArg) => {
        const line = getValue(memory, lineLocation, lineArg);
        const value = getValue(memory, compareLocation, compareArg);
        if (value < 0)
            return line;
    },
    [instruction_names_1.JMPE]: (memory, lineLocation, lineArg, leftLocation, leftArg, rightLocation, rightArg) => {
        const line = getValue(memory, lineLocation, lineArg);
        const left = getValue(memory, leftLocation, leftArg);
        const right = getValue(memory, rightLocation, rightArg);
        if (left === right)
            return line;
    },
    [instruction_names_1.JMPL]: (memory, lineLocation, lineArg, leftLocation, leftArg, rightLocation, rightArg) => {
        const line = getValue(memory, lineLocation, lineArg);
        const left = getValue(memory, leftLocation, leftArg);
        const right = getValue(memory, rightLocation, rightArg);
        if (left < right)
            return line;
    },
    [instruction_names_1.HALT]: (memory) => -1,
    [instruction_names_1.CALL]: (memory, programLocation, programArg, inboxLocation, inboxArg, outboxLocation, outboxArg) => {
        const programStart = getIndex(memory, programLocation, programArg);
        const program = memory.slice(programStart);
        const decompiled = decompile_1.decompile(program);
        const [[, outSize, inSize]] = decompiled;
        const inboxStart = getIndex(memory, inboxLocation, inboxArg);
        const inbox = memory.slice(inboxStart, inboxStart + inSize);
        const subMemory = new Int8Array(256);
        for (let i = 0; i < inbox.length; i++) {
            subMemory[i + outSize] = inbox[i];
        }
        execute_1.execute(decompiled, subMemory);
        const result = subMemory.slice(0, outSize);
        const outboxStart = getIndex(memory, outboxLocation, outboxArg);
        for (let i = 0; i < outSize; i++) {
            memory[outboxStart + i] = result[i];
        }
    }
};
//# sourceMappingURL=executors.js.map