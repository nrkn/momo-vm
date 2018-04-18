"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const executors_1 = require("./executors");
exports.execute = (program, memory) => {
    const { length } = program;
    let counter = 0;
    let i = 0;
    while (counter < length) {
        const [instr, ...args] = program[counter];
        const jumpLocation = executors_1.executors[instr](memory, ...args);
        if (jumpLocation === undefined) {
            counter++;
        }
        else if (jumpLocation === -1) {
            counter = length;
        }
        else {
            counter = jumpLocation;
        }
        i++;
        // arbitrary
        if (i === 65536) {
            throw Error('Too many operations');
        }
    }
};
//# sourceMappingURL=execute.js.map