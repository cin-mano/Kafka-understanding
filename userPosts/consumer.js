const USERPOST=require('./userPosts.schema')
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: ['localhost:9092'],
  });

  
  (async () => {

  const consumer = kafka.consumer({ groupId: 'demoTopic-consumerGroup' });

  
  await consumer.connect();
  console.log("Connected to consumer.");
  
  
  await consumer.subscribe({ topic: 'deletePost', fromBeginning: true });
  console.log("Consumer subscribed to topic = demoTopic");

  // Log every message consumed
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        switch(topic){
            case 'deletePost':
                await USERPOST.deleteMany({userId:message.value})
              break;
        }
    },
  });
})();