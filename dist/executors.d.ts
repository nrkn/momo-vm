export interface Executors {
    [instrId: number]: (memory: Int32Array, ...args: number[]) => number | void;
}
export declare const executors: Executors;
