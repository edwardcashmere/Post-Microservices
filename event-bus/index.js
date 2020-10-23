const express =require('express');
const app = express()
const axios=require('axios')


app.use(express.json())

events=[]

app.post('/events',(req,res)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const event = req.body
    events.push(event)
    axios.post('http://posts-srv-clusterip:4000/events',event,config);
    axios.post('http://comment-srv-clusterip:4001/events',event,config);
    axios.post('http://query-src-clusterip:4002/events',event,config);
    axios.post('http://moderation-src-clusterip:4003/events',event,config);

    res.send({ status: 'OK'})
})
app.get('/events',(req,res)=>{
    res.send(events)
})
app.listen(4005,()=>{
    console.log('event bus listening on port 4005')
})