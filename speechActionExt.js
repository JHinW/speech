(function (global) {
    var serviceUrl = "http://localhost:57993/api/Media";
    var sendAudio = function (view, parm, sampleRate) {
        var request = new XMLHttpRequest();
        request.open('POST', [
            serviceUrl,
            parm
        ].join(""), true);
        request.setRequestHeader("Content-Type", 'audio/wav; codec="audio/pcm"; samplerate=' + sampleRate);
        request.onload = function (result) {
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