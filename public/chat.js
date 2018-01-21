const socket = io.connect('http://localhost:3111');

var message = document.getElementById('message'),
  sender = document.getElementById('sender'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    sender: sender.value,
  });
  message.value = '';
});

message.addEventListener('focus', function() {
  socket.emit('typing', sender.value);
});

message.addEventListener('blur', function() {
  socket.emit('losing_typing', sender.value);
});

socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data) {
  feedback.innerHTML = `<p><em>${data} is typing a message</em></p>`;
});
socket.on('losing_typing', function(data) {
  feedback.innerHTML = '';
});
