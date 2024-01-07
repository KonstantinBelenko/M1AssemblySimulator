import { setupCodeWindow } from './editor';
import { tokenize, run, reset } from './runtime';

document.addEventListener("DOMContentLoaded", () => {
    setupCodeWindow();
});

const UIExecutionEnd = () => {
    console.log("Program execution complete.")
    document.getElementById("step").setAttribute("disabled", "true")
    document.getElementById("run").setAttribute("disabled", "true")
}

const UIReset = () => {
    document.getElementById("step").removeAttribute("disabled")
    document.getElementById("run").removeAttribute("disabled")
    stepGenerator = null
}

let stepGenerator: Generator | null = null;

document.getElementById("run").addEventListener("click", () => {
    const code = (<HTMLTextAreaElement>document.getElementById("code")).value
    const tokens = tokenize(code)
    let line = 0;
    stepGenerator = run(tokens)
    
    let { done } = stepGenerator.next()
    let exDone = done

    while (!exDone) {
        line += 1;
        let { done } = stepGenerator.next()
        exDone = done
    }
    UIExecutionEnd()
})

document.getElementById("step").addEventListener("click", () => {
    if (stepGenerator) {
        const { done } = stepGenerator.next()
        if (done) {
            UIExecutionEnd()
        }
    } else {
        const code = (<HTMLTextAreaElement>document.getElementById("code")).value
        const tokens = tokenize(code)
        stepGenerator = run(tokens)
        const { done } = stepGenerator.next()
        if (done) {
            UIExecutionEnd()
        }
    }
})

document.getElementById("reset").addEventListener("click", () => {
    reset()
    UIReset()
})
