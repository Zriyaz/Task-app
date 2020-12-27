import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Button, Table } from "react-bootstrap"
import Message from "./Message"
import Loader from "./Loader"
import Moment from "react-moment"
import axios from "axios"

const UserListScreen = ({history}) => {
  
     const [tasks, setTasks]  = useState([])
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState('')


    useEffect(() => {
       setLoading(true)
       axios.get('/api')
      .then(function (response) { 
       setTasks(response.data.tasks)
       setLoading(false)
  })
  .catch(function (err) {
      setError(err)
      console.log(error)
  });
    },[error])
    return (
        <React.Fragment>
            <Row className="align-items-center">
                <Col>
                 <h2 className="ml-2">List Of Your Task</h2>
                </Col>
                <Col className="text-right">
                   <Link to="/create"> <Button className="my-5 mr-3">
                      <i className=" mr-1 fas fa-plus"></i>Create Task
                    </Button></Link>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :(
               <Table striped borered hover responsive className="table-sm mt-3">
               <thead>
                   <tr>
                       <th>TASK NAME</th>
                       <th>PRIORITY</th>
                       <th>TASK CREATED</th>
                       <th>DUE DATE</th>
                       <th>STATUS</th>
                   </tr>
               </thead>
               <tbody>
                   {tasks.map(task => (
                       <tr key={task.name}>
                           <td>{task.name}</td>
                           <td>{task.priority}</td>
                           <td> <Moment format="YYYY/MM/DD">{task.createDate}</Moment></td>
                           <td><Moment format="YYYY/MM/DD">{task.dueDate}</Moment></td>
                           <td>{task.taskStatus}</td>
                           <td>
                               <Link to={`/update/${task._id}`}>
                                   <Button variant="light" className="btn-sm">
                                       <i className="fas fa-edit"></i>
                                   </Button>
                               </Link>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </Table>
            )}
        </React.Fragment>
    )
}

export default UserListScreen
