declare const MomoVM: {
    compile: (program: Int32Array[]) => Int32Array;
    decompile: (machineCode: Int32Array) => Int32Array[];
    detokenize: (program: Int32Array[]) => string;
    execute: (program: Int32Array[], memory: Int32Array) => void;
    parse: (str: string) => Int32Array[];
};
export = MomoVM;
