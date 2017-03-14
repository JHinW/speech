(function (global) {

    var content = {
        id: "",
        recordBegin: "",
        recordEnd: "",
        uploadBegin: "",
        TextRecived: "",
        TextWithIntention:""
    };

    function addTableDetails(content) {
        var ele = document.getElementById("logTable");
        var table = document.createElement('table');
        var html = [];
        html.push("<tr>");
        html.push("<td> " + content.id + "</td>");
        html.push("<td> " + content.recordBegin + "</td>");
        html.push("<td> " + content.recordEnd + "</td>");
        html.push("<td> " + content.uploadBegin + "</td>");
        html.push("<td> " + content.TextRecived + "</td>");
        html.push("<td> " + content.TextWithIntention + "</td>");
        html.push("</tr>");
        table.innerHTML = html.join('');
        ele.appendChild(table.children[0].children[0]);
    }

    global.addTableDetails = addTableDetails;
    global.content = content;

})(window)