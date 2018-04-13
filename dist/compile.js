"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = (program) => {
    const { length } = program;
    const offsets = [];
    const instrs = [];
    let i = 0;
    program.forEach(instr => {
        offsets.push(i);
        instrs.push(...instr);
        i += instr.length;
    });
    const compiled = [length, ...offsets, ...instrs];
    return new Int8Array(compiled);
};
//# sourceMappingURL=compile.js.map