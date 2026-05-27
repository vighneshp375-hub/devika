const express = require('express')
const corns = require('cors')
const app = express()

app.use(corns())
app.use(express.json())
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://vickyy:nandhu000@cluster0.xq2msem.mongodb.net/?appName=Cluster0/complaintbox").then(()=>{
    console.log("Database Connected")
})

let complaints = []
app.get('/complaints', (req, res) => {
    res.send(complaints)
})
app.post('/complaints', (req, res) => {
    console.log(req.body)
    complaints.push(req.body)
    res.send("Complaint added successfully")
})
app.listen(3000, () => {
    console.log("Server is started")
})