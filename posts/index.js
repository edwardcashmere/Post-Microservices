const express = require('express');
const app = express()
const { randomBytes} = require('crypto')
const cors=require('cors')
const axios=require('axios')
const morgan =require('morgan')


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.get('/posts',(req,res)=>{
    res.send(posts)
})

posts={}

app.post('/posts/create',async(req,res)=>{
    const id = randomBytes(4).toString('hex')
    const { title }=req.body
    posts[id]={
        id,title
    }
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    await axios.post('http://event-bus-srv:4005/events',{type:'POSTCREATED',data:{id,title},config})
    res.status(201).send(posts[id])
})
app.post('/events',(req,res)=>{
   console.log(`event emitted succesfully to: ${req.body.type}`)
    res.send({})
})

app.listen(4000,()=>{
    console.log('changed')
    console.log('posts server is running on port 4000')
})