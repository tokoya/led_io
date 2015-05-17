var socket = io.connect();

socket.on('connect', function() {
  console.log('connect');
  var img = document.getElementById("led_img");
  img.src = "/images/led-off.png";
  socket.on('event', function(data) {
    console.log('data: ' + data.onoff);
    if (data.onoff == 'on') {
      img.src = "/images/led-on.png";
    }
    if (data.onoff == 'off') {
      img.src = "/images/led-off.png";
    }
  });
});

function led_on() {
  console.log('led_on');
  socket.emit('event', { onoff: 'on'});
}

function led_off() {
  console.log('led_off');
  socket.emit('event', { onoff: 'off'});
}