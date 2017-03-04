(function(global){

    function BingSpeaker(req) {
        var t = this;
        t.GetSettings = function (callback) {
            var url = "http://opgwebapi.chinacloudsites.cn/api/settings/BingSpeakerSettings";
            t.urlForGet(req, url, callback);
        }
    }

    function LuisCognitive(req) {
        var t = this;
        
        t.GetSettings = function (callback) {
            var url = "http://opgwebapi.chinacloudsites.cn/api/Settings/LuisSettings";
            t.urlForGet(req, url, callback);
        }
    }

    function urlForGet(req, url, callBack) {
        req.open("GET", url);
        req.addEventListener("load", function (data) {
            if (typeof callBack === "function") {
                callBack.call(null, data.srcElement);
            }
        });
        req.send();
    }

    BingSpeaker.prototype.urlForGet = LuisCognitive.prototype.urlForGet = urlForGet;



    function SettingsFactory() {      
        var t = this;
        t.GetBingSpeakerObj = function () {
            var request = new XMLHttpRequest();
            return new BingSpeaker(applyDefaultEvent(request));
        }

        t.GetLuisCognitiveObj = function () {
            var request = new XMLHttpRequest();
            return new LuisCognitive(applyDefaultEvent(request));
        }

        function applyDefaultEvent(request) {
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
            return request;
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
            document.getElementById("luis_appid").value = result.appId;
            document.getElementById("luis_subid").value = result.subKey;
        });
        
    }

})(window)
