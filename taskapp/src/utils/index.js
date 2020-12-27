import axios from "axios"
export const createTask = async(name, priority, createDate, dueDate, taskStatus) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }   
     await axios.post('/api',{name, priority, createDate, dueDate, taskStatus},config)
  } catch (error) {
      console.log(error)
  }
}

export const updateTask = async( id, name, priority, createDate, dueDate, taskStatus) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }   
     await axios.put(`/api/${id}`,{name, priority, createDate, dueDate, taskStatus},config)
  } catch (error) {
      console.log(error)
  }
}
