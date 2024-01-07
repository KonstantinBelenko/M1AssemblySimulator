export type Register = 
    "x0" | "w0" |
    "x1" | "w1" |
    "x2" | "w2" |
    "x3" | "w3" |
    "x4" | "w4" |
    "x5" | "w5" |
    "x6" | "w6" |
    "x7" | "w7" |
    "x8" | "w8" |
    "x9" | "w9" |
    "x10" | "w10" |
    "x11" | "w11" |
    "x12" | "w12" |
    "x13" | "w13" |
    "x14" | "w14" |
    "x15" | "w15" |
    "x16" | "w16" |
    "x17" | "w17" |
    "x18" | "w18" |
    "x19" | "w19" |
    "x20" | "w20" |
    "x21" | "w21" |
    "x22" | "w22" |
    "x23" | "w23" |
    "x24" | "w24" |
    "x25" | "w25" |
    "x26" | "w26" |
    "x27" | "w27" |
    "x28" | "w28" |
    "fp" |
    "lr" |
    "sp" |
    "pc" |
    "cpsr"

export const registers: Register[] = [
    "x0", "w0",
    "x1", "w1",
    "x2", "w2",
    "x3", "w3",
    "x4", "w4",
    "x5", "w5",
    "x6", "w6",
    "x7", "w7",
    "x8", "w8",
    "x9", "w9",
    "x10", "w10",
    "x11", "w11",
    "x12", "w12", 
    "x13", "w13",
    "x14", "w14",
    "x15", "w15",
    "x16", "w16",
    "x17", "w17",
    "x18", "w18",
    "x19", "w19",
    "x20", "w20",
    "x21", "w21",
    "x22", "w22",
    "x23", "w23",
    "x24", "w24",
    "x25", "w25",
    "x26", "w26",
    "x27", "w27",
    "x28", "w28",
    "fp",
    "lr",
    "sp",
    "pc",
    "cpsr"
]

export interface Command {
    command: string;
    args: string[];
    address: number;
    line: number;
}