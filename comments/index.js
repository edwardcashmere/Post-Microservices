const { randomBytes } = require('crypto');
const express = require('express')
const app = express();
const cors = require('cors')
const axios =require('axios')
const morgan =require('morgan')




app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


const commentByPostId={}

//get all comments associated with a particular post

app.get('/posts/:id/comments',(req, res)=>{
    res.send(commentByPostId[req.params.id] || [])

})

//add a comment to a post
app.post('/posts/:id/comments',async(req, res)=>{
    const { content }  = req.body
    const commentId=randomBytes(4).toString('hex')

    const comments=commentByPostId[req.params.id] || []


    comments.push({id:commentId,content,status:'pending'})
    commentByPostId[req.params.id]=comments
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    await axios.post('http://event-bus-srv:4005/events',{type:'COMMENTCREATED',data:{id:commentId,content,postId:req.params.id,status:'pending'}},config)

    res.status(201).send(comments)

})

app.post('/events',async(req, res)=>{
    console.log('the event was emited is :'+ req.body.type)
    const {type,data}=req.body
if(type==='COMMENTMODERATED'){
    const { postId,id,status,content}=data
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const comments=commentByPostId[postId]

    comment =comments.find(comment => comment.id ===id)

    comment.status=status

    await axios.post('http:/event-bus-srv:4005/events',{type:'COMMENT_UPDATED',data:{id,postId,status,content}},config)


    
}

    res.send({})
})


app.listen(4001,()=>{
    console.log('comment service started on port 4001')
})