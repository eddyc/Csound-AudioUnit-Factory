(function()
{
    "use strict";

    function initialise(self) {

        // var childNodes = self.getElementsByTagName('csound-slider');
        //
        // var surroundingDiv = document.createElement('div');
        // self.appendChild(surroundingDiv);
        // surroundingDiv.style.border = "1px solid black";
        //
        // // surroundingDiv.style.width = (childNodes[0].diameter * childNodes.length * parseInt(childNodes[0].style.padding, 10)) + "px";
        // var diameter = childNodes[0].diameter;
        // var padding = 10;
        // surroundingDiv.style.width = (diameter + padding) * childNodes.length + "px";
        // surroundingDiv.style.height = (diameter + padding) + "px";
        // for (var i = 0; i < childNodes.length; ++i) {
        //
        //     childNodes[i].style.padding = padding;
        //     surroundingDiv.appendChild(childNodes[i]);
        // }
    }

    Polymer({

        is: 'csound-group',
        properties: {
        },
        attached:function() {
            console.log("called from group");
            initialise(this);
        },
    });

})();
