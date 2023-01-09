const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const postController=require("./userPosts.controller")
const bodyParser=require('body-parser');
require("./consumer")

  const app = express();
  app.use(bodyParser.json())
  app.use('/v1',router);


  mongoose.connect("mongodb://localhost:27017/kafka-prod", {
    useNewUrlParser: "true",
    useUnifiedTopology: true
  })
  mongoose.connection.on("error", err => {
    console.log("err", err)
  })
  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
  })

  router.post('/add-user-post',postController.addUserPost)
  
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`🎉🎉🎉 Application running on port: ${PORT} 🎉🎉🎉`);
  });