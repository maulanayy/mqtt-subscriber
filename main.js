const mqtt = require("mqtt");
const dotenv = require("dotenv").config();

const dbService = require("./service/db.service");
const modelService = require("./service/model.service");
var client  = mqtt.connect(process.env.HOST_MQTT)

const main = async () => {
  await dbService().start();

  const dataEwons = await modelService().getAll()
  const topics = dataEwons.map(x => {return x.txtTopic});

  if (client.connected) {
    console.log("MQTT : ",client.connected)
    client.subscribe(topics)
  }
  // client.on("connect",() => {
  //   console.log("CONNECTED MQTT");
  //   client.subscribe(["/tyto/flexy","ewons/test/messages6","testing_update"])
  // })

  client.on("message", (topic, message) => {
    const found = topics.find(x => {
        return x === topic
    })
    if(found){
        console.log("MESSAGE IS : ",message.toString())
        const value = message.toString()
        const ewonData = {
            ewon_id :found.intEwonSubsSettingID,
            value : parseFloat(value)
        }
        modelService().insertEwon(ewonData)
    }else{
        console.log("No handler for topic %s", topic);
    }
  });
  
  client.on("error",() =>{
    console.log("ERROR CONNECTION")
  })
};

main()
