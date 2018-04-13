declare const MomoVM: {
    compile: (program: Int8Array[]) => Int8Array;
    decompile: (machineCode: Int8Array) => Int8Array[];
    detokenize: (program: Int8Array[]) => string;
    execute: (program: Int8Array[], memory: Int8Array) => void;
    parse: (str: string) => Int8Array[];
};
export = MomoVM;
