import type { NextPage } from 'next'
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdDeleteOutline} from 'react-icons/md';

const Home: NextPage = () => {
  const [todo, setTodo] =  useState("");
  const [todos, setTodos] = useState<any>([]);
    
  const handleAddToDo = (e: any) => {
    e.preventDefault();

    if(todo !== ""){
      setTodos([{
        id: uuidv4(),
        message: todo,
        done: false
      },...todos])
  
      setTodo("");
    }
    else{
      alert("please enter todo")
    }    
  }

  const handleDelete = (id: any) => {
    //  const allTodos = [...todos];
    console.log(id);

    const deleteToDo: any = todos.filter((todo: any) => todo.id !== id); 
    console.log(deleteToDo);
    
    setTodos(deleteToDo);
  }

  const handleCompleted = (id: any) => {
    const completedTodo = todos.map((todo: any) => {
      if(todo.id === id){
        return {
          ...todo,
          done: !todo.done
        }
      }
      return todo;
    })
    
    setTodos(completedTodo);
  }

  return (
    <section className='flex flex-col items-center justify-center w-full h-screen space-y-5 bg-slate-400'>
      <h1 className='text-2xl text-center shadow-md'>To Do App</h1>

      <div className='w-1/2 p-2 border rounded shadow-md'>
        <form className='flex justify-between w-full space-x-3'>
          <input type="text"placeholder='new todo' value={todo} onChange={(e) => setTodo(e.target.value)} className='w-5/6'/>
          <button type="submit" className='w-1/6 px-5 py-3 bg-blue-400' onClick={handleAddToDo}>A q</button>  
        </form>
      </div>

      <div className='w-1/2'>
        <ul className='space-y-2 '>
          {todos.map((todo: any) => (
            <li key={todo.id} className={`${todo.done ? "border-green-400 shadow-lg" : "border-red-500"} border-2 flex justify-between py-2 px-5 rounded-md`}>
              <div className={`${todo.done ? 'text-green-500' : "text-red-500"}`}>
                {todo.message}
              </div>
              <div className='flex space-x-5'>
                  <button onClick={() => handleCompleted(todo.id)}>{todo.done ? <MdOutlineCheckBox className="text-2xl text-green-500"/> : <MdOutlineCheckBoxOutlineBlank className="text-2xl text-red-500"/>}</button>
                <button onClick={() => handleDelete(todo.id)}>
                <MdDeleteOutline/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Home;
