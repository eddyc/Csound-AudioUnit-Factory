(function () {

    "use strict";

    function initialise(self) {

        document.body.style.cursor = 'hand';
    }


    Polymer({

        is: 'csound-ui',
        properties: {
        },
        ready:function() {
            initialise(this);
        },
    });
})();
