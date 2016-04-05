var PreviewPanel = function(editorPanel) {

    "use strict";
    var iFrameElement = document.getElementById('PreviewIFrame');
    var addPresetInput = document.getElementById('AddPresetInput');
    addPresetInput.onchange = function (event) {

        $('#myModal').modal('toggle')
        addPreset(addPresetInput.value);
    };
    var iFrameDocument = iFrameElement.contentWindow.document;
    var fileReader = new FileReader();
    var registeredParameters = [];

    this.setHTML = function(htmlString, javascriptString) {

        htmlString = htmlString.replace("main.js", "");
        fileReader.getFileFromServer("js/AudioUnit.js", function (fileString) {

            registeredParameters = [];
            iFrameDocument.open();
            iFrameElement.contentWindow.eval(fileString);
            iFrameDocument.write(htmlString);
            iFrameElement.contentWindow.eval(javascriptString);
            iFrameDocument.close();
        });
    };

    this.setJavascript = function(javascriptString) {

        iFrameElement.contentWindow.eval(javascriptString);
    };



    window.addEventListener("message", function(message) {

        switch(message.data.type) {

            case "getParameterCallback": {

                registeredParameters.push(message.data.control);
                getParameters();
            }
        }
    }, false);

    var parameters = [];
    function getParameters() {

        parameters = [];

        for (var i = 0; i < registeredParameters.length; ++i) {

            var element = iFrameDocument.getElementById(registeredParameters[i]);
            var parameter = {};
            parameter.name = element.id;
            parameter.minValue = element.min;
            parameter.maxValue = element.max;
            parameter.defaultValue = element.value;
            parameters.push(parameter);
        }
    };


    var presets = [];

    function addPreset(presetName) {

        var preset = {};
        preset.name = presetName;
        preset.parameters = {};

        for (var i = 0; i < parameters.length; ++i) {

            var parameterElement = iFrameDocument.getElementById(parameters[i].name);
            preset.parameters[parameterElement.id] = parameterElement.value;
        }

        presets.push(preset);
        createPresetButton(preset);
    }


    var presetButtons = document.getElementById("PresetButtons");
    var presetButtonElements = [];

    function createPresetButton(preset) {

        var link = document.createElement("a");
        link.innerHTML = preset.name;
        link.href = "#";

        presetButtonElements.push(link);

        function clearActivePresets() {

            for (var i = 0; i < presetButtonElements.length; ++i) {

                presetButtonElements[i].className = "list-group-item";

            }
        }

        clearActivePresets();

        link.className = "list-group-item active";
        link.onclick = function () {

            clearActivePresets();
            link.className = "list-group-item active";

            for (var propertyName in preset.parameters) {

                iFrameElement.contentWindow.postMessage({control:propertyName, value:preset.parameters[propertyName]},"*");
                csound.SetChannel(propertyName, preset.parameters[propertyName]);
            }

        };
        presetButtons.appendChild(link);
    };

    this.addPreset = function (presetName) {

        addPreset(presetName);
    }

    var auBuilder = new AudioUnitBuilder();

    var saveButton = document.getElementById("SaveButton");
    saveButton.onclick = function() {

        var documents = editorPanel.getDocumentValues();
        var htmlString = documents.html;
        var csoundString = documents.csound;
        var presetsString = JSON.stringify(presets);
        var parametersString = JSON.stringify(parameters);
        auBuilder.buildAudioUnit(htmlString, csoundString, parametersString, presetsString);
        console.log("saving");
    }
};
