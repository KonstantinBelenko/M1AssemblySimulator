export const setupCodeWindow = () => {
    document.getElementById("code").addEventListener("keydown", function (e) {
        // Tab key in textarea
        if (e.key == "Tab") {
            e.preventDefault();
            // var start = this.selectionStart;
            var start = (<HTMLInputElement>this).selectionStart;
            var end = (<HTMLInputElement>this).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            (<HTMLInputElement>this).value =
            (<HTMLInputElement>this).value.substring(0, start) +
                "\t" +
                (<HTMLInputElement>this).value.substring(end);

            // put caret at right position again
            (<HTMLInputElement>this).selectionStart = (<HTMLInputElement>this).selectionEnd = start + 1;
        }
    });    
};
