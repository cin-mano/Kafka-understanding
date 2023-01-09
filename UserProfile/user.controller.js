const USER=require('./user.schema')
const kafkaProduce=require('./producer')

exports.addUser=async(req,res)=>{
    try{
       const checkId= await USER.findOne({userId:req.body.userId})
       if(checkId){
        return res.send({code:400,message:"UserId already exist"})
       }
       await USER.create(req.body)
       return res.send({code:200,message:"success"})
    }catch(err){
        console.log("error=>",err)
        return res.send(err)
    }
}
exports.deleteUser=async(req,res)=>{
    try{
        const checkId= await USER.findOne({userId:req.body.userId})
       if(!checkId){
        return res.send({code:400,message:"User Not found"})
       }
        await USER.deleteOne({userId:req.body.userId})
       res.send({code:200,message:"success"})
       kafkaProduce.produceEvent('deletePost',[
        { value: req.body.userId },
      ]).then(()=>{
        console.log("all posts of the user is also deleted");
      }).catch((e)=>{console.log("kafka error=>>",e)})
    }catch(err){
        console.log("error=>",err)
        return res.send(err)
    }
}
exports.followUser=async(req,res)=>{
    try{
        const {userId,toFollow}=req.body
        const checkId=await USER.findOne({userId:toFollow});
        if(!checkId){
            return res.send({code:200,message:"user not found to follow"})
        }
        await USER.updateOne({userId:toFollow},{$push:{followers:userId}})
        return res.send({code:200,message:"success"})
    }catch(e){
        console.log("error=>",err)
        return res.send(err)
    }
}
exports.userFeeds=async(req,res)=>{
    try{
        const feeds=await USER.findOne({userId:req.body.userId}).select('feed')
       return res.send({code:200,data:feeds})
    }catch(err){
        console.log("error=>",err)
        return res.send(err)
    }
}