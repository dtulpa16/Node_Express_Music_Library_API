const {ToDo, validate} = require('../models/toDo');
const express = require('express')
const router = express.Router()

//All endpoints and route handlers go here

router.get('/', async (req,res)=>{
    try{
        const todos = await ToDo.find()
        return res.send(todos)
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const todo = await ToDo.findById(req.params.id);
        if (!todo){
            return res.status(400).send(`The todo item with id ${req.params.id} does not exist.`)
    }
        return res.send(todo)
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
})

router.post('/', async (req,res)=>{
    try{
        const { error }=validate(req.body)
        if (error){
            return res.status(400).send(error)
        }
        const todo = new ToDo({
            title: req.body.title,
            dueDate: req.body.dueDate,
            importance:req.body.importance,
            reoccurring:req.body.reoccurring,
            frequency:req.body.frequency,
        })
        await todo.save();

        return res.send(todo)
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`)
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error)

        const product = await ToDo.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                dueDate: req.body.dueDate,
                importance: req.body.importance,
                reoccurring:req.body.reoccurring,
                frequency:req.body.frequency,
            },
            {new:true}
        )
        if(!todo){
            return res.status(400).send(`The Todo Item with id "${req.params.id} does not exist"`);
        }
        await todo.save()
        return res.send(todo)
    } catch (ex) {
        return res.status(500).send(`Internal Server ErrorL ${ex}`)
    }
})

module.exports = router;