const USERPOST=require('./userPosts.schema')
const kafkaProduce=require('./producer')


exports.addUserPost=async(req,res)=>{
    try{
       await USERPOST.updateOne({userId:req.body.userId},{$push:{content:req.body.content}},{upsert:true})
       res.send({code:200,message:"success"})
       let payload={
        userId:req.body.userId,
        content:req.body.content
       }
       kafkaProduce.produceEvent('updateFeed',[
        {value:JSON.stringify(payload)}
      ]).then(()=>{
        console.log("followers feed updated");
      }).catch((e)=>{console.log("kafka error=>>",e)})
    }catch(err){
        console.log("error=>",err)
        return res.send(err)
    }
}
