(function (global) {
    var serviceUrl = "https://opgwebapi.azurewebsites.net/api/Media";
    var sendAudio = function (view, parm, sampleRate) {
        var request = new XMLHttpRequest();
        request.open('POST', [
            serviceUrl,
            parm
        ].join(""), true);
        request.setRequestHeader("Content-Type", 'audio/wav; codec="audio/pcm"; samplerate=' + sampleRate);
        request.onload = function (result) {
            setComparisonText(result.currentTarget.responseText);
            var response = handleJSONWebResponse(request);
            console.log(response);
        }
        request.send(view);
    }

    function handleJSONWebResponse(xhr) {
        if (typeof (xhr.response) == "string") {
            return JSON.parse(xhr.response);
        }
        return xhr.response;
    }

    global.sendAudioToServer = sendAudio;

})(window)