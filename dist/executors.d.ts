export interface Executors {
    [instrId: number]: (memory: Int8Array, ...args: number[]) => number | void;
}
export declare const executors: Executors;
