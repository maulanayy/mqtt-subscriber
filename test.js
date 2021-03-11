var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.171.121.96')
 
client.on('connect', function () {
    console.log("CONNECTED")
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('testing_update', 'Hello mqtt')
      client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})