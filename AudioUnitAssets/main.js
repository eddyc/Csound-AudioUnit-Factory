
function configureSlider(id, minimum, maximum, step) {

    var slider = document.getElementById(id);
    slider.min = minimum;
    slider.max = maximum;
    slider.step = step;
    return slider;
}

var attackSlider = configureSlider("Attack", 0.001, 1, 1/100);

attackSlider.oninput = function() {

    AudioUnit.setParameter("Attack", attackSlider.value);
}

function setAttack(inputValue) {

    attackSlider.value = inputValue;
}

AudioUnit.getParameterCallback("Attack", setAttack);
AudioUnit.setParameter("Attack", attackSlider.value);

var releaseSlider = configureSlider("Release", 0.001, 5, 1/100);

releaseSlider.oninput = function() {

    AudioUnit.setParameter("Release", releaseSlider.value);
}

function setRelease(inputValue) {

    releaseSlider.value = inputValue;
}

AudioUnit.getParameterCallback("Release", setRelease);
AudioUnit.setParameter("Release", releaseSlider.value);

