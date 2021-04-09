let events = require('events')

let eventEmitter = new events.EventEmitter()

eventEmitter.on('connection', () => {
  console.log('connect success')
  eventEmitter.emit('data_received')
})

eventEmitter.on('data_received', () => {
  console.log('receive data success')
})

eventEmitter.emit('connection')

console.log('program run complete')
