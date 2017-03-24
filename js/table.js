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


    var contentWithDirectLatency = {
        id: "",
        RequestArrival: "",
        GetAudioTextLatency: "",
        GetAudioIntentionLatency: "",
        ResponseArrival: "",
        TotalTime: ""
    };

    function addTableDetails(content, typeStr) {
        var ele = document.getElementById("logTable");
        var table = document.createElement('table');
        var html = [];
        html.push("<tr>");
        html.push("<td> " + content.id + "</td>");
        html.push("<td> " + typeStr + "</td>");
        html.push("<td> " + "" + "</td>");
        html.push("<td> " + (content.TextRecived - content.uploadBegin) + "</td>");
        html.push("<td> " + (content.TextWithIntention - content.TextRecived) + "</td>");
        html.push("<td> " + "" + "</td>");
        html.push("<td> " + (content.TextWithIntention - content.uploadBegin) + "</td>");
        html.push("</tr>");
        table.innerHTML = html.join('');
        ele.appendChild(table.children[0].children[0]);
    }

    function addTableDirectDetails(contentWithDirectLatency, typeStr) {
        var ele = document.getElementById("logTable");
        var table = document.createElement('table');
        var html = [];
        html.push("<tr>");
        html.push("<td> " + contentWithDirectLatency.id + "</td>");
        html.push("<td> " + typeStr + "</td>");
        html.push("<td> " + contentWithDirectLatency.RequestArrival + "</td>");
        html.push("<td> " + contentWithDirectLatency.GetAudioTextLatency + "</td>");
        html.push("<td> " + contentWithDirectLatency.GetAudioIntentionLatency + "</td>");
        html.push("<td> " + contentWithDirectLatency.ResponseArrival + "</td>");
        html.push("<td> " + contentWithDirectLatency.TotalTime + "</td>");
        html.push("</tr>");
        table.innerHTML = html.join('');
        ele.appendChild(table.children[0].children[0]);
    }


    global.addTableDetails = addTableDetails;
    global.addTableDirectDetails = addTableDirectDetails;
    global.content = content;
    global.contentWithDirectLatency = contentWithDirectLatency;

})(window)