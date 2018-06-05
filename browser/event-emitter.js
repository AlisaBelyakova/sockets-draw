window.EventEmitter = function () {
    this.subscribers = {};
};

(function (EE) {


    // instanceOfEE.on('touchdown', cheerFn);
    window.EventEmitter.prototype.on = function (eventName, eventListener) {

        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }
        this.subscribers[eventName].push(eventListener);

    };

    // instanceOfEE.emit('codec', 'Hey Snake, Otacon is calling!');
    window.EventEmitter.prototype.emit = function (eventName) {

        if (!this.subscribers[eventName]) {
            return;
        }

        var remainingArgs = [].slice.call(arguments, 1);

        this.subscribers[eventName].forEach(function (listener) {
            listener.apply(null, remainingArgs);
        });

    };

})(window.EventEmitter);