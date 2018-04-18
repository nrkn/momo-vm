"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const instruction_names_1 = require("../instruction-names");
const __1 = require("..");
const src = instruction_names_1.instructionNames.reduce((obj, name) => {
    if (name === 'prog')
        return obj;
    if (name !== 'call') {
        obj[name] = fs.readFileSync(`./src/test/fixtures/${name}.asm`, 'utf8');
    }
    return obj;
}, {});
src.indirect = fs.readFileSync(`./src/test/fixtures/indirect.asm`, 'utf8');
const addCompiled = __1.compile(__1.parse(src.add));
const subCompiled = __1.compile(__1.parse(src.sub));
const callInbox = new Int32Array(addCompiled.length + subCompiled.length);
callInbox.set(addCompiled);
callInbox.set(subCompiled, addCompiled.length);
const addLength = addCompiled.length;
src.call = `
prog 1 ${callInbox.length}
copy ${callInbox.length + 1} $2
copy ${callInbox.length + 2} $3
copy ${callInbox.length + 3} $12
call 1 ${callInbox.length + 1} ${callInbox.length + 4}
call ${addLength + 1} ${callInbox.length + 3} 0
`;
const expect = {
    'add': [[2, 3], [5]],
    'sub': [[5, 3], [2]],
    'inc': [[2], [4]],
    'dec': [[4], [2]],
    'copy': [[1, 2, 3], [3, 2, 1]],
    'jmp': [[10], [10]],
    'jmpz': [[10], [10]],
    'jmpn': [[10], [-1, 11]],
    'jmpe': [[10], [3, 7]],
    'jmpl': [[10], [2, 8]],
    'halt': [[10], [2, 8]],
    'call': [callInbox, [7]],
    'indirect': [[2, 3, 4, 5, 6], [20]]
};
const getOutbox = (asm, inbox) => {
    const parsed = __1.parse(asm);
    const [[, outSize, inSize]] = parsed;
    const memory = new Int32Array(256);
    for (let i = 0; i < inbox.length; i++) {
        memory[i + outSize] = inbox[i];
    }
    __1.execute(parsed, memory);
    return Array.from(memory.slice(0, outSize));
};
const run = (name) => {
    const [inArr] = expect[name];
    const inbox = new Int32Array(inArr);
    const asm = src[name];
    return getOutbox(asm, inbox);
};
describe('instructions', () => {
    instruction_names_1.instructionNames.forEach(name => {
        if (name === 'prog')
            return;
        it(name, () => {
            const [, expectArr] = expect[name];
            const result = run(name);
            assert.deepEqual(result, expectArr);
        });
    });
});
describe('utils', () => {
    describe('detokenize', () => {
        Object.keys(src).forEach(name => {
            it(name, () => {
                const asm = src[name].trim();
                const parsed = __1.parse(asm);
                const compiled = __1.compile(parsed);
                const detokenized = __1.detokenize(parsed);
                assert.strictEqual(asm, detokenized);
            });
        });
    });
});
describe('location types', () => {
    it('indirect', () => {
        const [, expectArr] = expect.indirect;
        const result = run('indirect');
        assert.deepEqual(result, expectArr);
    });
    it('indirect add', () => {
        const indirectAdd = `
      prog 1 0
      copy 1 $0
      add @1 $1
    `;
        const result = getOutbox(indirectAdd, new Int32Array());
        assert.deepEqual(result, [1]);
    });
});
describe('errors', () => {
    it('too many instructions', () => {
        const tooMany = `
      prog 0 0
      jmp $1
    `;
        assert.throws(() => getOutbox(tooMany, new Int32Array()));
    });
    it('unexpected location', () => {
        const unexpectedLocation = `
      prog 0 0
      copy lol lol
    `;
        assert.throws(() => __1.parse(unexpectedLocation));
    });
    it('bad index', () => {
        const badIndex = `
      prog 0 0
      add $100 $100
    `;
        assert.throws(() => getOutbox(badIndex, new Int32Array()));
    });
    it('bad value', () => {
        const badValue = [
            new Int32Array([0, 1, 2]),
            new Int32Array([1, 3, 0, 0, 1]),
            new Int32Array([1, 0, 0, 0, 2])
        ];
        assert.throws(() => __1.execute(badValue, new Int32Array()));
    });
});
//# sourceMappingURL=index.js.map