const express = require('express')
const app= express();
const morgan =require('morgan')
const axios= require('axios')

app.use(morgan('dev'))
app.use(express.json())

app.post('/events',async(req, res)=>{

    const {type,data}=req.body
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    if(type === 'COMMENTCREATED'){
        const status=data.content.toLowerCase().includes('fuck')?'rejected':'approved'
        await axios.post('http://localhost:4005/events',{type:'COMMENTMODERATED',data:{id:data.id,content:data.content,status,postId:data.postId}},config)
    }

})


app.listen(4003,()=>{
    console.log('moderation service running in port 4003')
})