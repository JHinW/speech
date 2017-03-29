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
            var response = handleJSONWebResponse(request);
            setComparisonText(syntaxHighlight(response));
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

    // http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return match;
        });
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