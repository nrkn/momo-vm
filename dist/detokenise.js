"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_names_1 = require("./instruction-names");
const location_names_1 = require("./location-names");
exports.detokenize = (program) => program.map(instr => {
    const [instrId, ...iArgs] = instr;
    const name = instruction_names_1.instructionNames[instrId];
    const types = instruction_names_1.argTypes[instrId];
    const args = iArgs.map((arg, i) => {
        const type = types[i];
        const prevType = types[i - 1];
        if (type === 'location')
            return '';
        if (prevType === 'location') {
            const locationType = iArgs[i - 1];
            if (locationType === location_names_1.VALUE)
                return '$' + arg;
            if (locationType === location_names_1.INDIRECT)
                return '@' + arg;
        }
        return arg;
    });
    return [name, ...args].filter(s => s !== '').join(' ');
}).join('\n');
//# sourceMappingURL=detokenise.js.map