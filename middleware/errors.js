const notFound = (req,res,next)=>{
    const error = new Error(`not found - ${req.originalUrl}`)//route not found in our routes
    res.status(404)
    next(error)

}
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode=== 200?500:res.statusCode//with error like id not found in mongodb(6)
    res.status(statusCode).json({message: err.message})
}
module.exports = {notFound,errorHandler}