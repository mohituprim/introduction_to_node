/*
 * Resource extends EventEmitter, and emits events itself.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Resource (m) {
    
    var maxEvents = m;
    //Need to use this because now we are inheriting the eventemittor
    var self = this;

    process.nextTick(function() {
        var count = 0;
        self.emit('start');
        var t = setInterval(function() {
            self.emit('data', ++count);
            if (count === maxEvents) {
                self.emit('end', count);
                clearInterval(t);
            }
        }, 10)
    });

};

// Our Resource object inherits from EventEmitter
util.inherits(Resource, EventEmitter);

module.exports = Resource;
