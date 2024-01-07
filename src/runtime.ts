import { type Instruction, type Register, registers } from './types/registers';


/**
 * Runs the program
 * @param {Instruction[]} tokens
 */
export function* run (instructions: Instruction[], pcStartAddr: string): Generator<void, void, void> {

    setRegister("pc", parseInt(pcStartAddr));
    let pc = parseInt(pcStartAddr) / 4;

    while (pc < instructions.length) {
        const instruction = instructions[pc];
        switch (instruction.command) {
            case "mov":
                mov(instruction.args[0] as Register, instruction.args[1]);
                break;
            case "add":
                add(instruction.args[0] as Register, instruction.args[1] as Register, instruction.args[2]);
                break;
            case "sub":
                sub(instruction.args[0] as Register, instruction.args[1], instruction.args[2]);
                break;
            case "mul":
                mul(instruction.args[0] as Register, instruction.args[1] as Register, instruction.args[2] as Register);
                break;
            default:
                console.log(instruction);
                alert(`Unknown command \"${instruction.command}\" at line ${instruction.line}`);
                break;
        }
        pc++;
        if (pc < instructions.length) {
            setRegister("pc", instructions[pc].address); // Set PC to the address of the next instruction
        }
        yield;
    }
};

/**
 * @param {string} text
 * @returns {Instruction[]}
 */
export const tokenize = (text: string): { instructions: Instruction[], pcStartAddr: string } => {
    const instructions = [];
    const lines = text.split("\n");
    let entryPoint = "";
    let isEntryPoint = false;
    let pcStartAddr = "";

    for (let i = 0, address = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith("#") || line.length === 0) continue;

        if (line.startsWith(".global ")) {
            entryPoint = line.split(" ")[1];
            continue;
        }

        if (line.includes(":") && entryPoint.length !== 0 && line.startsWith(entryPoint)) {
            isEntryPoint = true;
            continue;
        } else if (line.includes(":")) {
            continue;
        }

        const command = line.split(" ")[0];
        const args = line.split(" ").slice(1).map(arg => arg.replace(",", ""))
        instructions.push({ command, args, line: i + 1, address });

        if (isEntryPoint) {
            isEntryPoint = false;
            pcStartAddr = address.toString();
            address += 4;
            continue;
        }

        address += 4;
    }

    if (pcStartAddr.length === 0) {
        throw new Error("No entry point found. Please add a .global directive.")
    }

    return { instructions, pcStartAddr }
};

const mov = (dest: Register, src: string) => {

    // check if register is out of bounds
    if (!registers.includes(dest)) {
        alert(`Invalid register ${dest}`);
        return;
    }

    if (src[0] !== "#" && !registers.includes(src as Register)) {
        alert(`Invalid register ${src}`);
        return;
    }

    let value: number;
    if (src[0] === "#") {
        value = parseInt(src.slice(1));
    } else {
        value = parseInt(document.getElementById(src).innerHTML);
    }

    setRegister(dest, value);
};

const add = (dest: Register, left: Register, right: string) => {

    if (!registers.includes(dest)) {
        alert(`Invalid register ${dest}`);
        return;
    }

    if (!registers.includes(left)) {
        alert(`Invalid register ${left}`);
        return;
    }

    if (right[0] !== "#" && !registers.includes(right as Register)) {
        alert(`Invalid register ${right}`);
        return;
    }

    let leftValue: number;
    let rightValue: number;
    if (left[0] === "#") {
        leftValue = parseInt(left.slice(1));
    } else {
        leftValue = parseInt(document.getElementById(left).innerHTML);
    }

    if (right[0] === "#") {
        rightValue = parseInt(right.slice(1));
    } else {
        rightValue = parseInt(document.getElementById(right).innerHTML);
    }

    const result = leftValue + rightValue;
    setRegister(dest, result);
};

const sub = (dest: Register, left: string, right: string) => {

    if (!registers.includes(dest)) {
        alert(`Invalid register ${dest}`);
        return;
    }

    if (left[0] !== "#" && !registers.includes(left as Register)) {
        alert(`Invalid register ${left}`);
        return;
    }

    if (right[0] !== "#" && !registers.includes(right as Register)) {
        alert(`Invalid register ${right}`);
        return;
    }

    let leftValue: number;
    let rightValue: number;
    if (left[0] === "#") {
        leftValue = parseInt(left.slice(1));
    } else {
        leftValue = parseInt(document.getElementById(left).innerHTML);
    }

    if (right[0] === "#") {
        rightValue = parseInt(right.slice(1));
    } else {
        rightValue = parseInt(document.getElementById(right).innerHTML);
    }

    const result = leftValue - rightValue;
    setRegister(dest, result);
}

const mul = (dest: Register, left: Register, right: Register) => {
    if (!registers.includes(dest)) {
        alert(`Invalid register ${dest}`);
        return;
    }

    if (!registers.includes(left)) {
        alert(`Invalid register ${left}`);
        return;
    }

    if (!registers.includes(right)) {
        alert(`Invalid register ${right}`);
        return;
    }

    const leftValue = parseInt(document.getElementById(left).innerHTML);
    const rightValue = parseInt(document.getElementById(right).innerHTML);

    const result = leftValue * rightValue;
    setRegister(dest, result);
}

const setRegister = (register: Register, int: number) => {
    document.getElementById(register).innerHTML = "0x" + int.toString(16);
    document.getElementById(register + "d").innerHTML = int.toString();
};

export const reset = () => {
    for (const register of registers) {
        if (register[0] === "w") continue
        setRegister(register, 0);
    }
};
