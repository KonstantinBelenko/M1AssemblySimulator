const registers = [
    "x0",
    "x1",
    "x2",
    "x3",
    "x4",
    "x5",
    "x6",
    "x7",
    "x8",
    "x9",
    "x10",
    "x11",
    "x12",
    "x13",
    "x14",
    "x15",
    "x16",
    "x17",
    "x18",
    "x19",
    "x20",
    "x21",
    "x22",
    "x23",
    "x24",
    "x25",
    "x26",
    "x27",
    "x28",
    "x29",
    "x30",
];

/**
 * Runs the program
 * @param {string} text 
 */
const run = (text) => {
    const tokens = tokenize(text);
    console.log(tokens);

    if (!tokens.some((token) => token.command === ".global")) {
        alert("No entry point found. Please add a .global directive.");
    }
    const entryPoint = tokens.find((token) => token.command === ".global")
        .args[0];

    for (const token of tokens) {
        switch (token.command) {
            case "mov":
                mov(token.args);
                break;
            case ".global":
                break;
            case entryPoint + ":":
                break;
            default:
                console.log(token);
                alert(
                    `Unknown command \"${token.command}\" at line ${token.line}`
                );
                break;
        }
    }
};

/**
 * @typedef {Object} Command
 * @property {string} command
 * @property {string[]} args
 */

/**
 * @param {string} text
 * @returns {Command[]}
 */
const tokenize = (text) => {
    const commands = [];
    const lines = text.split("\n");
    for (const line of lines) {
        if (line.trim().length === 0) continue;
        const command = line.trim().split(" ")[0];
        const args = line.trim().split(" ").slice(1);
        for (let i = 0; i < args.length - 1; i++) {
            args[i] = args[i].replace(",", "");
        }
        console.log("parsing", { command, args });
        commands.push({ command, args });
    }
    return commands;
};

const mov = (args) => {
    const [dest, src] = args;
    if (src[0] === "#") {
        const int = parseInt(src.slice(1));
        const hexRep = "0x" + int.toString(16);
        setRegister(dest, hexRep);
    }
};

const setRegister = (register, value) => {
    document.getElementById(register).innerHTML = value;
};

const reset = () => {
    for (const register of registers) {
        setRegister(register, "0x0");
    }
};
