const express = require('express')
const { check, validationResult } = require('express-validator')
const TaskData  = require('./dataModel')

const router = express.Router()

router.post(
    '/',
     [
       check('name',  'Task name is required').not().isEmpty(), 
       check('priority', 'Please specify the task'),
       check('dueDate', 'Task status is must!').not().isEmpty(),    
       check('taskStatus', 'Task status is must!').not().isEmpty(),
    ],
    async (req, res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
       const {
           name, priority, dueDate, taskStatus, createDate
       } = req.body 

       try {
           const task = new TaskData({name, priority, dueDate, taskStatus, createDate}) 

           if(task){
               const createTask = await task.save()
               return res.status(201).json(createTask)
           }
       } catch (error) {
           console.log(error.message)
           res.status(500).send("Server Error")
       }

    }   
)

router.get('/', async(req, res)=>{
    try {
        const tasks = await TaskData.find({})
        if(tasks.length == 0){
           return res.status(200).json({message: "Data is not available"})  
        }
         res.status(200).json({tasks})
       
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const task = await TaskData.findById(req.params.id)
        if(!task){
           return res.status(200).json({message: "data is not available"})  
        }
         res.status(200).json(task)
       
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

router.put('/:id', async(req, res)=>{
    const {
        name, priority, dueDate, taskStatus, createDate
    } = req.body 
    try {
        const task = await TaskData.findById(req.params.id)
        console.log(req.body)
        if(task){
           task.name=name
           task.priority = priority
           task.createDate = createDate
           task.dueDate = dueDate
           task.taskStatus= taskStatus 
           await task.save()
        }else{
            return res.status(200).json({message: "data is not available"})  
        }
         res.status(200).json({message: "Task Updated"})
       
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router
