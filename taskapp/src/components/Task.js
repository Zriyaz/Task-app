import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from './FormContainer'
import {createTask} from "../utils"

const priorityOptions = [
  {
    name: "Low",
    value: "low"
  },
  {
    name: "High",
    value: "High"
  },
  {
    name: "Medium",
    value: "Medium"
  },
]

const statusOptions = [

  {
    name: "To Do",
    value: "To Do"
  },
  {
    name: "Review",
    value: "Review"
  },
  {
    name: "Completed",
    value: "Completed"
  },

]

const getDateTime = () => {
  let tempDate = new Date();
  let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds(); 
  return date;
}


const Task= ({history}) => {

  const [name, setName] = useState('')
  const [priority, setPriority] = useState(priorityOptions[0].value)
  const [createDate, setCreateDate] = useState(getDateTime())
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState(statusOptions[0].value)


  const submitHandler = (e) => {
    e.preventDefault()
    createTask(name, priority, createDate, dueDate, status)
    history.push("/")
    
  }
  return (
    <>
      <Link to='/' className='btn btn-light my-4 ml-3'>
        Home
      </Link>
      <FormContainer>
        <h2>Create New Task</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Select Priority</Form.Label>
              <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
              {priorityOptions.map(o=>(
                  <option key={o.value} value={o.value}>{o.name}</option>
                ))}
               </Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Today's Date</Form.Label>
              <Form.Control type="text" name="today date" placeholder="Today's Date" value={createDate} onChange={(e)=>setCreateDate(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="due date" placeholder="Due Date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Select Status</Form.Label>
              <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                {statusOptions.map(o=>(
                  <option key={o.value} value={o.value}>{o.name}</option>
                ))}
               </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
            <Link to="/" className="btn btn-primary ml-2">Cancel</Link>
          </Form>
      </FormContainer>
    </>
  )
}

export default Task
