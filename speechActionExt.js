(function (global) {

    var content = {
        id: "",
        recordBegin: "",
        recordEnd: "",
        uploadBegin: "",
        TextRecived: "",
        TextWithIntention: "",
        TotalTime : ""
    };

    var serviceUrl = "https://opgwebapi.azurewebsites.net/api/Media";
    var beginTtime = null;
    var endTime = null;
    var sendAudio = function (view, parm, sampleRate) {
        beginTtime = (new Date()).getTime();
        var request = new XMLHttpRequest();
        request.open('POST', [
            serviceUrl,
            parm
        ].join(""), true);
        request.setRequestHeader("Content-Type", 'audio/wav; codec="audio/pcm"; samplerate=' + sampleRate);
        request.onload = function (result) {
            endTime = (new Date()).getTime();
            setComparisonText(result.currentTarget.responseText);
            var response = handleJSONWebResponse(request);
            contentWithDirectLatency.id = response.Text;
            contentWithDirectLatency.RequestArrival = (new Date(response.ArrivalTime)).getTime();
            contentWithDirectLatency.ResponseArrival = (new Date(response.EndTime)).getTime();
            contentWithDirectLatency.GetAudioTextLatency = response.GetAudioTextLantency;
            contentWithDirectLatency.GetAudioIntentionLatency = response.GetAudioIntentionLantency;
            contentWithDirectLatency.TotalTime = endTime - beginTtime;

            addTableDirectDetails(contentWithDirectLatency, 'GateWay');
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

    function getUTCNow() {
        var now = new Date();
        var time = now.getTime();
        var offset = now.getTimezoneOffset();
        offset = offset * 60000;
        return time - offset;
    }

    global.sendAudioToServer = sendAudio;

})(window)