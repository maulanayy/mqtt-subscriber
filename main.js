const mqtt = require("mqtt");
const dotenv = require("dotenv").config();

const dbService = require("./service/db.service");
const modelService = require("./service/model.service");
const client = mqtt.connect("mqtt://test.mosquitto.org");


const main = async () => {
  await dbService().start();

  const dataEwons = await modelService().getAll();

  client.on("connect",() => {
    console.log("Connecting MQTT");
    client.subscribe(["testing_update"])
  })


  client.on("message", (topic, message) => {
      console.log(topic)
    const found = dataEwons.find(x => {
        return x.txtTopic === topic
    })
    console.log(found)
    if(found){
        console.log("MESSAGE BUFFER : ",message)
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
  
};


main();
