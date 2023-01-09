const { Kafka } = require('kafkajs');
const USER = require("./user.schema")
const kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: ['localhost:9092'],
  });

  
  (async () => {

  const consumer = kafka.consumer({ groupId: 'Follower-updateFeed' });

  
  await consumer.connect();
  console.log("Connected to consumer.");
  
  
  await consumer.subscribe({ topic: 'updateFeed', fromBeginning: true });
  console.log("Consumer subscribed to topic = demoTopic");

  // Log every message consumed
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        switch(topic){
            case 'updateFeed':
              let plainText=message.value
              let messageData=JSON.parse(plainText.toString())
                const followers=await USER.findOne({userId:messageData.userId}).select('followers')
                console.log("===>>>",followers)
                const tempArr=followers.followers
                const check=await USER.updateMany({userId:{$in:tempArr}},{$push:{feed:messageData.content}})
                console.log("seee====>>>>",check)
              break;
        }
    },
  });
})();