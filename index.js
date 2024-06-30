const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const { checkForAuthenticationCookie } = require("./middlewares/authentication")

const app = express()
const PORT = 8000

mongoose.connect('mongodb://localhost:27017/blogify').then((e)=>console.log("MongoDb Connected"))

app.set('view engine', 'ejs')
app.set('views',path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.get('/',async (req,res)=>{
    const allblogs = await Blog.find({})
    console.log(allblogs);
    res.render("home",{
        user:req.user,
        blogs:allblogs
    })
})
app.use('/user',userRoute)
app.use('/blog',blogRoute)


app.listen(PORT,()=>console.log(`server started at PORT:${PORT}`))