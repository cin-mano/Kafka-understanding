const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: ['localhost:9092'],
  });
  
exports.produceEvent=async(topic,messageArr)=>{

  const producer = kafka.producer();


  await producer.connect();
  console.log("Connected to producer.");
  

  await producer.send({
    topic: topic,
    messages: messageArr,
  });
  console.log("Produced a message.");
  
  // Disconnect the producer once we’re done
  await producer.disconnect();
}