import axios from "axios"
import { useState } from "react"

export default function Form(){

    const [task, setTask]=useState()
    const handleAdd=()=>{
        axios.post('http://localhost:3001/add', {task:task})
        .then(result =>{
            location.reload()
        })
        .catch(err =>{console.log(err)})
    }       





    return(
        <div className="flex justify-center items-center mb-10 ">
            <input onChange={(e)=>setTask(e.target.value)} placeholder="Enter Task" type="text" name="" id="" className="border border-black p-2  rounded-md"/>
            <button onClick={handleAdd} type="button" className="bg-black text-white px-4 py-2 rounded-md mx-10">Add</button>
        </div>
    )
}

