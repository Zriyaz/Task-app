import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from './Loader'
import FormContainer from './FormContainer'
import {updateTask} from "../utils"

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

const UpdateTask = ({history, match}) => {

  const [name, setName] = useState('')
  const [priority, setPriority] = useState('')
  const [createDate, setCreateDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
      setLoading(true)
    axios.get(`/api/${match.params.id}`)
    .then(function (response) {
        console.log("Single Task", response.data.name)
    setName(response.data.name)
    setCreateDate(response.data.createDate)
    setDueDate(response.data.dueDate)
    setStatus(response.data.taskStatus)
    setPriority(response.data.priority) 
    setLoading(false)
   })
  .catch(function (error) {
    console.log(error);
  })
 },[match])

  console.log(name, createDate )
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Submited", name, priority, createDate, dueDate, status)
    updateTask(match.params.id, name, priority, createDate, dueDate, status)
    history.push('/')
    
  }
  return (
    <>
      <Link to='/' className='btn btn-light my-4 ml-3'>
        Home
      </Link>
      <h2 className="text-center"> Update Your Task</h2>
      <FormContainer>
          {loading ? <Loader/> : (
              <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group controlId='priority'>
                <Form.Label>Select Priority</Form.Label>
                <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {priorityOptions.map(o=>(
                    <option key={o.value} value={o.value}>{o.name}</option>
                  ))}
                 </Form.Control>
              </Form.Group>
              <Form.Group controlId='createdDate'>
                <Form.Label>Created Date</Form.Label>
                <Form.Control type="text" placeholder="Today's Date" value={createDate} onChange={(e)=>setCreateDate(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='due date'>
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="due date" placeholder="Due Date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='status'>
                <Form.Label>Select Status</Form.Label>
                <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {statusOptions.map(o=>(
                    <option key={o.value} value={o.value}>{o.name}</option>
                  ))}
                 </Form.Control>
              </Form.Group>
              <Button type='Submit' variant='primary'>
                Submit
              </Button>
              <Link to="/" className="btn btn-primary ml-2">Cancel</Link>
            </Form>
          )}
      </FormContainer>
    </>
  )
}

export default UpdateTask
