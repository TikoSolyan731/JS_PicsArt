const EventEmitter = require('./EventEmitter');

const emitter = EventEmitter();

emitter.on('fire', (sound) => {
    console.log('Fire!!!', sound);
});

emitter.on('fire', (sound) => {
    console.log('WOwww', sound);
});

console.log(emitter.listenerCount('fire'));
console.log(emitter.listeners('fire'));

emitter.emit('fire', 'BANG');

console.log('Fired');