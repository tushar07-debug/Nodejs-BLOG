const { Router } = require("express")
const User = require('../models/user')
const router = Router()

router.get('/signin', (req, res) => {
    return res.render('signin');
});
router.get('/signup', (req, res) => {
    return res.render('signup');
});

// router.post("/signin",async(req,res)=>{
//     const {email,password}=req.body;
//     const user = User.matchPassword(email,password)

//     console.log("User",user)
//     return res.redirect("/")

// })

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password); 

        // console.log("token", token);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        console.error("Error signing in:", error.message);
        return res.render('signin', { error: error.message });
    }
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})

router.post("/signup",async (req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('/'); 
});

module.exports = router