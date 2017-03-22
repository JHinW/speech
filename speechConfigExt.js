(function(global){

    XMLHttpRequest.prototype.bindEventsForGet = function (callBack) {

        var request = this;
        function updateProgress() {
            console.log("The transfer is progress.");

        };
        request.addEventListener("progress", updateProgress);

        function transferComplete() {
            console.log("The transfer is complete.");
        };
        request.addEventListener("load", transferComplete);

        function transferFailed() {
            console.log("An error occurred while transferring the file.");
        };
        request.addEventListener("error", transferFailed);

        function transferCanceled() {
            console.log("The transfer has been canceled by the user.");
        };
        request.addEventListener("abort", transferCanceled);

        request.onload = function (data) {
            if (typeof callBack === "function") {
                callBack.call(null, data.srcElement);
            }
        };


        return function (url) {
            request.open("GET", url);
            request.send();
        };
    }


    function BingSpeaker(req) {
        var t = this;
        
        t.GetSettings = function (callback) {
            var url = "https://opgwebapi.chinacloudsites.cn/api/settings/BingSpeakerSettings";
            var runner = req.bindEventsForGet(callback);
            runner(url);
        }
    }

    function LuisCognitive(req) {
        var t = this;
        
        t.GetSettings = function (callback) {
            var url = "https://opgwebapi.chinacloudsites.cn/api/Settings/LuisSettings";
            var runner = req.bindEventsForGet(callback);
            runner(url);
        }
    }
    // BingSpeaker.prototype.urlForGet = LuisCognitive.prototype.urlForGet = urlForGet;
    function SettingsFactory() {      
        var t = this;

        t.GetBingSpeakerObj = function () {
            var request = new XMLHttpRequest();
            return new BingSpeaker(request);
        }

        t.GetLuisCognitiveObj = function () {
            var request = new XMLHttpRequest();
            return new LuisCognitive(request);
        }

    } 
    var factory = new SettingsFactory();
    var luis = factory.GetLuisCognitiveObj();
    var bingSpeaker = factory.GetBingSpeakerObj();

    global.setAllConfigs = function () {

        bingSpeaker.GetSettings(function (data) {
            var result = JSON.parse(data.responseText);

            document.getElementById("key").value = result.speakerKey;
        });

        luis.GetSettings(function (data) {
            var result = JSON.parse(data.responseText);
            /*
            document.getElementById("luis_appid").value = result.appId;
            document.getElementById("luis_subid").value = result.subKey;
            */
            document.getElementById("luis_appid").value = "8a3aeb1c-525c-44c9-9be9-856b3b35fe53";
            document.getElementById("luis_subid").value = "1ccb9a5dfc844d21b91f762b7d07e5ef";
        });
    }

    global.setSpeakerConfigs = function () {

        bingSpeaker.GetSettings(function (data) {
            var result = JSON.parse(data.responseText);

            document.getElementById("key").value = result.speakerKey;
        });

        document.getElementById("luis_appid").value = "";
        document.getElementById("luis_subid").value = "";
    }



})(window)