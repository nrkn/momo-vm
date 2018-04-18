"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_names_1 = require("./instruction-names");
const location_names_1 = require("./location-names");
exports.parse = (str) => {
    const segs = str.split(/\s+/).filter(s => s !== '');
    const lines = [];
    let line = [];
    let currentInstr;
    segs.forEach((seg, i) => {
        if (instruction_names_1.instructionNames.includes(seg)) {
            currentInstr = seg;
            if (i > 0) {
                lines.push(new Int32Array(line));
                line = [];
            }
            line.push(instruction_names_1.instructionNames.indexOf(seg));
        }
        else if (/^\d+$/.test(seg)) {
            if (currentInstr !== 'prog') {
                line.push(location_names_1.DIRECT);
            }
            line.push(Number(seg));
        }
        else if (/^\$\d+$/.test(seg)) {
            line.push(location_names_1.VALUE);
            line.push(Number(seg.slice(1)));
        }
        else if (/^@\d+$/.test(seg)) {
            line.push(location_names_1.INDIRECT);
            line.push(Number(seg.slice(1)));
        }
        else {
            throw Error(`Unexpected token: ${seg}`);
        }
    });
    lines.push(new Int32Array(line));
    return lines;
};
//# sourceMappingURL=parse.js.map