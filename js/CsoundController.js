var CsoundController = function() {

    this.setCSD = function (csdString) {

        csound.PlayCsd("./http/AudioUnitAssets/main.csd");
    };

    this.evaluateInstrument = function(instrumentString) {

        csound.CompileOrc(instrumentString);
    };

    this.setControlChannel = function(control, value) {

        csound.SetChannel(control, value);
    };


    var handleMidiInput = function(event) {

        csound.MIDIin(event.data[0], event.data[1], event.data[2]);
    };

    var midiSuccess = function(midiInterface) {

        var inputs = midiInterface.inputs.values();

        for (var input = inputs.next(); input && !input.done; input = inputs.next() ){

            input = input.value;
            input.onmidimessage = handleMidiInput;
        }
    };

    var midiFail = function(error) {

        console.log("MIDI failed to start, error:" + error);
    };
    if (navigator.requestMIDIAccess) {

        navigator.requestMIDIAccess().then(midiSuccess, midiFail);
    }
    else {

        console.log("MIDI not supported in this browser");
    }    
};
