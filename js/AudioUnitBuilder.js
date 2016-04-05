var AudioUnitBuilder = function() {

    var zip;
    JSZipUtils.getBinaryContent('MyAudioUnit.component.zip', function(err, data) {

        if(err) {

            throw err; // or handle err
        }

        zip = new JSZip(data);
    });

    this.buildAudioUnit = function(html, csound, parameters, presets) {

        zip.file("MyAudioUnit.component/Contents/Resources/MyAudioUnitView.bundle/Contents/Resources/index.html", html);
        zip.file("MyAudioUnit.component/Contents/Resources/main.csd", csound);
        zip.file("MyAudioUnit.component/Contents/Resources/Parameters.json", parameters);
        zip.file("MyAudioUnit.component/Contents/Resources/Presets.json", presets);

        var content = zip.generate({type:"blob"});
        saveAs(content, "AudioUnit.zip");
    };
};
