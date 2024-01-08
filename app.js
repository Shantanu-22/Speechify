if(process.env.NOD_ENV != "production"){
    require('dotenv').config()
}
const OpenAI =require("openai");
const express = require("express");
const app = express();
const path = require("path");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

app.use(express.urlencoded({extended:true}));

const openai = new OpenAI({
    apiKey: process.env.API_KEY, // This is the default and can be omitted
});

app.get("/",(req,res)=>{
    res.render("Index.ejs");
})

app.post("/gpt",async (req,res)=>{
    const question = req.body.message;
    const chatCompletion = await openai.chat.completions.create({
         messages: [{ role: 'user', content: question }],
        model: 'gpt-3.5-turbo',
    });
    const ans = chatCompletion.choices[0].message.content;
    console.log(ans);
    res.json({ans});
})

app.listen ("3000",()=>{
    console.log("Server start");
})


