var AudioUnit = {};


AudioUnit.setParameter = function (control, value) {

    parent.postMessage({type:"setParameter", control:control, value:value},"*");
};


var controlCallbacks = {};
AudioUnit.getParameterCallback = function (control, callback) {

    controlCallbacks[control] = callback;
    parent.postMessage({type:"getParameterCallback", control:control},"*");
};

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
    controlCallbacks[event.data.control](event.data.value);
}
