"use client"
import { useEffect, useState } from 'react'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'
import Form from '../components/form'
import axios from 'axios'

export default function Home() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => { setTodos(result.data) })
      .catch(err => { console.log(err) })
  }, [])

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, { done: true })
      .then(result => {
        location.reload()
      })
      .catch(err => {
        console.log(err)
      });
  };
  
const handleDelete=(id)=>{
  axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        location.reload()
      })
      .catch(err => {
        console.log(err)
      });
}
return (
  <div className="justify-center items-center">
    <h1 className="text-center text-2xl font-bold mb-10 mt-10">Todo List</h1>
    <Form />
{
  todos.length === 0
    ? <div><h2 className="text-center text-2xl font-bold mb-10 mt-10">No Task Added</h2></div>
    : todos.map((todo) => (
      <div
        key={todo._id}
        className="task bg-black text-white font-bold mb-2 mt-2 p-2 max-w-md mx-auto rounded flex items-center justify-between"
      >
        <div className="flex items-center cursor-pointer" onClick={() => handleEdit(todo._id)}>
          {todo.done
            ? <BsFillCheckCircleFill className="mr-2 text-green-500" /> 
            : <BsCircleFill className="mr-2 text-white" /> 
          }
          <p className={`ml-2 ${todo.done ? "line-through text-gray-400" : ""}`}>{todo.task}</p>
        </div>
        <BsFillTrashFill className="cursor-pointer text-red-500" onClick={()=>handleDelete(todo._id)}/>
      </div>
    ))
}
  </div>
)
}