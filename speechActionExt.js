(function (global) {
    var action = ["greet", "Open TV", "Change Channel", "Close TV"];



    var myPromise = function (fn) {

        var _this = this;

        var handler = [];
        var value = null;

        _this.done = function (oncall) {
            if (typeof oncall === "function") {
                setTimeout(function () {
                    handler.push(oncall.bind(_this));
                }, 0);
                //return new myPromise(value);
            }
        }
        
        _this.then = function (oncall) {
            var self = this;
            return new myPromise((thenResolve) =>{
                return self.done((result) =>{
                    return thenResolve(oncall.bind(self)(result));
                });
            });
        }

        function resolve(val) {
            value = val;
            [].forEach.call(null, (item) =>{
                item(val);
            });
            handler = [];
        }

        function doProcess() {
            fn.call(_this, resolve);
        }

        doProcess();
    }

    var ActionIdentiy = function () {
        var _this = this;
        _this.WhichAction = function (intentArr) {
            
<<<<<<< HEAD
            for (var item in intentArr) {
                var out = action.find(function (value) {
                    if (item === value) {
                        return new myPromise(value);
                    }
                });
            }

        };
=======
            return new myPromise(function(resolve){
                for (var item in intentArr) {
                    var out = action.find(function (value) {
                        if (item === value) {
                            resolve(value);
                        }
                    });
                }
>>>>>>> bee3393c0cd0b57b06042f9088f408da2f874416

                resolve("error");
            });
        };
    }

    global.ActionIdentiy = ActionIdentiy;

})(window)