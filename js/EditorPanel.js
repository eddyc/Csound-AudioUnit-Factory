var EditorPanel = function() {

    var panelDiv = document.getElementById("EditorPanel");

    var htmlEditorDiv = document.createElement("div");
    htmlEditorDiv.className = "AceEditor";
    var htmlEditButton =  document.getElementById("HTMLEditButton");
    var csoundEditorDiv = document.createElement("div");
    csoundEditorDiv.className = "AceEditor";
    var csoundEditButton =  document.getElementById("CsoundEditButton");
    var javascriptEditorDiv = document.createElement("div");
    javascriptEditorDiv.className = "AceEditor";
    var javascriptEditButton =  document.getElementById("JavascriptEditButton");

    var csoundController = new CsoundController();

    window.addEventListener("message", function(message) {

        switch(message.data.type) {

            case "setParameter": {

                csoundController.setControlChannel(message.data.control, message.data.value);

            }
        }
    }, false);

    panelDiv.appendChild(csoundEditorDiv);

    htmlEditButton.onchange = function() {

        panelDiv.innerHTML = "";
        panelDiv.appendChild(htmlEditorDiv);
    };

    csoundEditButton.onchange = function() {

        panelDiv.innerHTML = "";
        panelDiv.appendChild(csoundEditorDiv);
    };

    javascriptEditButton.onchange = function() {

        panelDiv.innerHTML = "";
        panelDiv.appendChild(javascriptEditorDiv);
    };

    var htmlEditor, csoundEditor; 

    var fileReader = new FileReader();

    var previewPanel = new PreviewPanel(this);

    fileReader.getFileFromServer("AudioUnitAssets/index.html", function(result) {

        htmlEditor = new Editor(htmlEditorDiv, result, function () {

            previewPanel.setHTML(htmlEditor.getValue(), javascriptEditor.getValue());

        });
        htmlEditor.setMode("html");
    });

    fileReader.getFileFromServer("AudioUnitAssets/main.csd", function(result) {

        csoundEditor = new Editor(csoundEditorDiv, result, function (instrumentString) {

            csoundController.evaluateInstrument(instrumentString);

        });
        csoundController.setCSD(result);
    });


    fileReader.getFileFromServer("AudioUnitAssets/main.js", function(result) {

        javascriptEditor = new Editor(javascriptEditorDiv, result, previewPanel.setJavascript);         
        javascriptEditor.setMode("javascript");
        previewPanel.setHTML(htmlEditor.getValue(), result);

    });

    this.getDocumentValues = function() {

        return {html:htmlEditor.getValue(), javascript:javascriptEditor.getValue(), csound:csoundEditor.getValue()};
    }
}
