const connectDB = require ('./startup/db')
const express = require('express');
const app = express()
const toDos = require('./routes/todo')

connectDB()

app.use(express.json());
app.use('/api/todos', toDos)

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`)
})