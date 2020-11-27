import mqtt from 'mqtt'

const BASE_URL = 'ws://localhost'
let client = {}

export default {
  initMqtt(id, callback) {
    client = mqtt(BASE_URL, {
      port: 8072,
      clientId: id,
      clean: false
    })
    client.on('message', (topic, message) => {
      callback(topic, message)
    })
  },
  end() {
    client.end()
  },
  subscribe(topic) {
    client.subscribe(topic, { qos: 1 })
    console.log('subscribe:', topic)
  },
  publish(topic, message) {
    client.publish(topic, JSON.stringify(message), { qos: 1 })
  }
}
