const express =  require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const connectDB = require("./db") 

const app = express()

connectDB()
app.use(express.json())
app.use('/api', require('./api'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('taskapp/build'))
  
    app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname, 'taskapp', 'build', 'index.html'))
    })
  }

const PORT  = process.env.PORT || 8000
app.listen(PORT, ()=>console.log(`Server is Running...on ${PORT}`))