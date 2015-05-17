var io = require('socket.io');  
var gpio = require('onoff').Gpio;
var led = new gpio(17, 'out');

function sock(server) {
  var sock = io.listen(server);
  sock.sockets.on('connection', function(socket) {
    socket.on('event', function(data) {   // クライアントからのイベント受信
      console.log('socket id: [' + socket.id + '] data: ' + data.onoff);
      if (data.onoff == 'on') {
        led.writeSync(1);
        sock.sockets.emit('event', { onoff: 'on' });  // 全てのクライアントへ送信
        // 送信元にだけ送信する場合は
        // socket.emit を使う
        // 送信元以外の全てに送信する場合は
        // socket.broadcast.emit を使う
      }
      if (data.onoff == 'off') {
        led.writeSync(0);
        sock.sockets.emit('event', { onoff: 'off' }); // 全てのクライアントへ送信
      }
    });
    socket.on('disconnect', function() {  // 切断
      console.log('disconnect id: [' + socket.id + ']');
    });
  });
}

module.exports = sock;
