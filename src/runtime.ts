import { Command, registers, type Register } from "./types/registers";


/**
 * Runs the program
 * @param {Command[]} tokens
 */
export function* run (tokens: Command[]): Generator<void, void, void> {
    if (!tokens.some((token) => token.command === ".global")) {
        alert("No entry point found. Please add a .global directive.")
        yield
    }
    const entryPoint = tokens.find((token) => token.command === ".global").args[0]

    let pc = tokens.findIndex((token) => token.command === entryPoint + ":")

    if (pc === -1) {
        alert(`No entry point found for ${entryPoint}`)
        yield
    }

    setRegister("pc", tokens[pc].address)

    while (pc < tokens.length) {
        const token = tokens[pc];
        switch (token.command) {
            case "mov":
                mov(token.args[0] as Register, token.args[1]);
                break;
            case "add":
                add(token.args[0] as Register, token.args[1] as Register, token.args[2]);
                break;
            case "sub":
                sub(token.args[0] as Register, token.args[1], token.args[2]);
                break;
            case "mul":
                mul(token.args[0] as Register, token.args[1] as Register, token.args[2] as Register);
            case ".global":
            case entryPoint + ":":
                break;
            default:
                console.log(token);
                alert(`Unknown command \"${token.command}\" at line ${token.line}`);
                break;
        }
        pc++;
        if (pc < tokens.length) {
            setRegister("pc", tokens[pc].address); // Set PC to the address of the next instruction
        }
        yield;
    }
};

/**
 * @param {string} text
 * @returns {Command[]}
 */
export const tokenize = (text: string): Command[] => {
    const commands = [];
    const lines = text.split("\n");
    for (let i = 0, address = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim().startsWith("#") || line.trim().length === 0) continue;

        const command = line.trim().split(" ")[0];
        const args = line.trim().split(" ").slice(1).map(arg => arg.replace(",", ""))
        commands.push({ command, args, line: i + 1, address });
        address += 8;
    }
    return commands;
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
