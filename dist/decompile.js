"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompile = (machineCode) => {
    const [length, ...rest] = machineCode;
    const offsets = rest.slice(0, length);
    const instrs = rest.slice(length);
    const program = [];
    for (let i = 0; i < length; i++) {
        const offset = offsets[i];
        let instrLen;
        if (i < length - 1) {
            const nextOffset = offsets[i + 1];
            instrLen = nextOffset - offset;
        }
        const instr = instrLen ?
            instrs.slice(offset, offset + instrLen) :
            instrs.slice(offset);
        program.push(new Int8Array(instr));
    }
    return program;
};
//# sourceMappingURL=decompile.js.map