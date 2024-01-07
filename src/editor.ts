const startingText = `.global main
            
main:
        # Move 2 into x0
        mov x0, #2

        # Move 3 into x1
        mov x1, #3

        # Add 3 + 2 and save to x2
        add x2, x0, x1

        # Sub 1 from x2, and save to x3
        sub x3, x2, #1

		# Multiply
		mul x4, x3, x3`


export const setupCodeWindow = () => {

    const codeArea: HTMLTextAreaElement = document.getElementById("code") as HTMLTextAreaElement;
    
    codeArea.value = startingText;

    codeArea.addEventListener("keydown", function (e) {
        // Tab key in textarea
        if (e.key == "Tab") {
            e.preventDefault();
            // var start = this.selectionStart;
            var start = codeArea.selectionStart;
            var end = codeArea.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            codeArea.value =
            codeArea.value.substring(0, start) +
                "\t" +
                codeArea.value.substring(end);

            // put caret at right position again
            codeArea.selectionStart = codeArea.selectionEnd = start + 1;
        }
    })
};
