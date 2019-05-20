/**
 * Basic Realtime telemetry plugin using websockets.
 */
function RealtimeTelemetryPlugin() {
    return function (openmct) {
	var socketURL = location.origin.replace(/^http/, 'ws') + ':1234';
	//var socketURL = "ws://192.168.1.150:1234";
	console.log("websocket url " + socketURL);
        var socket = new WebSocket(socketURL);
        var listener = {};

        socket.onmessage = function (event) {
            point = JSON.parse(event.data);
	    console.log(point);
            if (listener[point.id]) {
                listener[point.id](point);
            }
        };

        var provider = {
            supportsSubscribe: function (domainObject) {
                return domainObject.type === 'example.telemetry';
            },
            subscribe: function (domainObject, callback) {
                listener[domainObject.identifier.key] = callback;
                socket.send('subscribe ' + domainObject.identifier.key);
                return function unsubscribe() {
                    delete listener[domainObject.identifier.key];
                    socket.send('unsubscribe ' + domainObject.identifier.key);
                };
            }
        };

        openmct.telemetry.addProvider(provider);
    }
}
