(function (global) {
    var action = ["greet", "Open TV", "Change Channel", "Close TV"];

    var myPromise = function (value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        });
    }

    var ActionIdentiy = function () {
        var _this = this;
        _this.WhichAction = function (intentArr) {
            
            for (var item in intentArr) {
                var out = action.find(function (value) {
                    if (item === value) {
                        return new myPromise(value);
                    }
                });
            }
        };

        
    }

})(window)