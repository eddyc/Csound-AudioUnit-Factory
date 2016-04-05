/* exported createSVGElement, setSVGElement */
function createSVGElement(elementType, attributes) {

    "use strict";

    const element = document.createElementNS('http://www.w3.org/2000/svg', elementType);

    for(let property in attributes) {

        element.setAttribute(property, attributes[property]);
    }

    return element;
}

function setSVGElement(element, attributes) {

    "use strict";

    for(let property in attributes) {

        element.setAttribute(property, attributes[property]);
    }

    return element;
}


Math.fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };
