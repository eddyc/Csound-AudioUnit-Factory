var Editor = function(parentElement, fileText, evaluateCallback) {

    var editor = ace.edit(parentElement);
    editor.setValue(fileText, -1);
    parentElement.style.background = 'transparent';
    //   editor.$blockScrolling = Infinity;
    editor.setOption("highlightActiveLine", false)
    editor.setOption("cursorStyle", "smooth")
    editor.setShowPrintMargin(false);

    var aceRange = ace.require('ace/range').Range;
    var marker;

    editor.commands.addCommand({
        name: 'myCommand',
        bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
        exec: function(editor) {

            function handleMarker(e) {

                var markerDiv = e.target.childNodes[0];

                if (markerDiv) {

                    markerDiv.style.transition = "all 0.05s ease-in";
                    markerDiv.style.backgroundColor = "#aaa";
                    setTimeout(function() {

                        markerDiv.style.transition = "all .4s ease-in";
                        markerDiv.style.backgroundColor = "#fff";


                        parentElement.removeEventListener("DOMSubtreeModified", handleMarker, false);
                    }, 20);
                }
            }

            parentElement.addEventListener("DOMSubtreeModified", handleMarker, false);
            var currentInstrument = ParseInstrument(editor.getValue(), editor.getCursorPosition().row);
            editor.session.removeMarker(marker);
            var range = new aceRange(currentInstrument.startline, 0, currentInstrument.endline, 0);
            marker = editor.session.addMarker(range, "ace_active-line", "fullLine");
            var markerLayers = document.getElementsByClassName('ace_active-line');
            var activeLineDiv = markerLayers[0];    

            evaluateCallback(currentInstrument.text);
        },
        readOnly: true // false if this command should not apply in readOnly mode
    });

    this.setMode = function(mode) {

        editor.getSession().setMode("ace/mode/" + mode); 
    };

    this.getValue = function() {

        return editor.getValue();
    }
};

