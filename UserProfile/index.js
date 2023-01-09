const express = require('express');
const mongoose = require("mongoose");
const userController=require("./user.controller")
const app = express();
const router=express.Router();
const bodyParser=require('body-parser');
require("./consumer")


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
// router.get('/health',(req,res)=>{
//   res.send("running")
// })

router.post('/add-user',userController.addUser)
router.post('/delete-user',userController.deleteUser)
router.post('/follow-user',userController.followUser)
router.get('/user-feeds',userController.userFeeds)
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🎉🎉🎉 Application running on port: ${PORT} 🎉🎉🎉`);
  });