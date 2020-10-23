const express = require('express');
const app=express();
const cors=require('cors');
const axios = require('axios')

app.use(express.json())
app.use(cors())

posts={}

app.get('/posts',(req,res)=>{
    res.send(posts)
    
})

const HandelEvents=(type,data)=>{if(type == 'POSTCREATED'){
    const {id,title}=data

    posts[id]={id,title,comments:[]}
}

if(type == 'COMMENTCREATED'){
    const {id,content,postId,status}=data
    const post=posts[postId]
    post.comments.push({id,content,status})

}
if(type == 'COMMENT_UPDATED'){
    const {id,content,postId,status}=data
    const post=posts[postId]
    comment= post.comments.find(comment=>{
        return comment.id === id
    })
    comment.status=status
    comment.content=content

}


}

app.post('/events',(req,res)=>{
    const {type ,data}=req.body

    HandelEvents(type,data)

   // console.log(posts)
    res.send({})

})



app.listen(4002,async()=>{
    console.log(`query service running on port 4002`)
    const res = await axios.get('http://event-bus-srv:4005/events')

    res.data.forEach(event => {
        console.log('processing event:',event.type)
        HandelEvents(event.type,event.data)
        
    });

})