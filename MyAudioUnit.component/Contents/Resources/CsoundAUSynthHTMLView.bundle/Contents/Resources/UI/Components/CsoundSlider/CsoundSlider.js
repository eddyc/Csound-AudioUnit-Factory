(function()
{
    "use strict";

    function initialise(self) {

        console.log(self.channel);

        const slider = configureSlider(self.channel, self.minimum, self.maximum, self.step);

        slider.oninput = function() {

            AudioUnit.setParameter(self.channel, slider.value);
        };

        function setValue(inputValue) {

            slider.value = inputValue;
        }

        function configureSlider(id, minimum, maximum, step) {

            const slider = document.getElementById(self.channel);
            slider.min = minimum;
            slider.max = maximum;
            slider.step = step;
            return slider;
        }


        AudioUnit.getParameterCallback(self.channel, setValue);
        AudioUnit.setParameter(self.channel, slider.value);
    }






    Polymer({

        is: 'csound-slider',
        properties: {
            channel:String,
            minimum:Number,
            maximum:Number,
            step:Number
        },
        ready:function() {
            initialise(this);
        },
    });

})();
