import { setupCodeWindow } from './setup';
import { tokenize, run, reset } from './runtime';

document.addEventListener("DOMContentLoaded", () => {
    setupCodeWindow();
});

document.getElementById("run").addEventListener("click", () => {
    const code = (<HTMLTextAreaElement>document.getElementById("code")).value;
    console.log("AAAAAAAAAA");
    console.log(code);
    const tokens = tokenize(code);
    run(tokens);
});

document.getElementById("reset").addEventListener("click", () => {
    reset();
});