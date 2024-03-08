const mongoose = require('mongoose')
async function connectToDB (){
    try{
        await mongoose.connect(process.env.MONGO_URI)
            console.log('connected to mongoDB')

    }catch(error){
        console.log('connected faild to mongoDB',error)
    }}
//old way
// mongoose
//         .connect(process.env.MONGO_URI)
//         .then(()=> console.log('connected to mongoDB'))
//         .catch((error)=>console.log('connected faild to mongoDB',error))
module.exports=connectToDB