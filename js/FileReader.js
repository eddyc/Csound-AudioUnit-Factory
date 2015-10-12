var FileReader = function() {

    this.getFileFromServer = function(url, doneCallback) {
        var xhr;

        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handleStateChange;
        xhr.open("GET", url, true);
        xhr.send();

        function handleStateChange() {
            if (xhr.readyState === 4) {
                doneCallback(xhr.status == 200 ? xhr.responseText : null);
            }
        }
    }

}
