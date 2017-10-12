(function()
{
    "use strict";

    function initialise(self) {

        var width = self.diameter;
        var stateGraph = new StateGraph(self, width);
        var currentValue = self.current;
        self.$.SVGText.innerHTML = parseFloat(Math.round(currentValue * 100) / 100).toFixed(2);

        stateGraph.setValue((currentValue / self.maximum) * 340);

        var range = self.maximum - self.minimum;
        var steps = range * self.step;

        self.$.SVGParent.style.width = width + 'px';
        self.$.Container.style.float = "left";
        self.$.Container.style.padding = "10px";
        self.$.Container.setAttribute('id', self.channel);
        self.$.SVGText.setAttribute('x', (width/2) + 'px');
        self.$.SVGText.setAttribute('y', (width/2 + 5) + 'px');
        self.$.SVGText.setAttribute('font-family', 'sans-serif');

        self.$.Container.onwheel = function (event) {

            setControlValue(event.deltaY * steps);
            stateGraph.setValue((currentValue / self.maximum) * 340);
            console.log("scroll %f", currentValue);

            self.$.SVGText.innerHTML = parseFloat(Math.round(currentValue * 100) / 100).toFixed(2);
            window.onwheel = preventDefault;
            AudioUnit.setParameter(self.channel, currentValue);
        }

        self.$.Container.onmouseout = function () {

            window.onwheel = null;
        }

        function setValue(inputValue) {

            setControlValue(inputValue);
            stateGraph.setValue((inputValue / self.maximum) * 340);
        }

        function setControlValue(value) {

            currentValue += value;

            if (currentValue >= self.maximum) {

                currentValue = self.maximum;
            }
            else if (currentValue <= self.minimum) {

                currentValue = self.minimum;
            }
        }

        AudioUnit.getParameterCallback(self.channel, setValue);
        AudioUnit.setParameter(self.channel, currentValue);
    }

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
        e.preventDefault();
        e.returnValue = false;
    }



    Polymer({

        is: 'csound-slider',
        properties: {
            diameter:Number,
            channel:String,
            minimum:Number,
            maximum:Number,
            current:Number,
            step:Number
        },
        ready:function() {
            console.log("called from slider");
            initialise(this);
        },
    });

})();
