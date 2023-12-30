import React from 'react'
import './Todoapp.css'
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import { BiSolidEditAlt } from "react-icons/bi";
import { useState, useRef, useEffect } from 'react';


function Todoapp() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editId,setEditId]=useState(0)


  const handleSubmit = (e) => {
    e.preventDefault();

  }


  const addTodo = () => {
    if(todo !==''){
    setTodos([...todos, {list:todo,id:Date.now(),status:false}]);
    console.log(todos);
    setTodo('');
    }
    if(editId){
      const editTodo=todos.find((todo)=>todo.id==editId)
      const updateTodo=todos.map((to)=>to.id===editTodo.id
      ?(to={id:to.id,list:todo})
      :(to={id:to.id,list:to.list}))
      setTodos(updateTodo)
      setEditId(0);
      setTodo('')
    }
  };
  const inputRef = useRef('null');

  useEffect(() => {
    inputRef.current.focus();

  });
  const onDelete=(id)=>{
   setTodos(todos.filter((to)=>to.id !==id))

  }
  const onComplete =(id)=>{
    let complete =todos.map((list)=>{
      if(list.id===id){
      return({...list ,status :!list.status})
      }
      return list
  })
  setTodos(complete)

  }
  const onEdit=(id)=>{
     const editTodo=todos.find((todo)=>todo.id===id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
    
    
  }



  return (
    <div className='contanier'>
      <h2 className='text'>TODO APP</h2>
      <form className='fname' onSubmit={handleSubmit}>
        <input type='texts' value={todo} ref={inputRef} placeholder='enter your todo' className='form-control' onChange={(event) => setTodo(event.target.value)} />
        <button className='btnm' onClick={addTodo}>{editId? 'EDIT':'ADD'}</button>

      </form>
      <div className='list'>
        <ul>
          {
            todos.map((to) => (
              <li className='list-items'>
                <div className='list-item-list' id={to.status ?'list-item':''}>{to.list}</div>
                <span>
                  <TiTick 
                  className='list-item-icons' 
                  id='complete' 
                  title='Complete' 
                  onClick={()=>onComplete(to.id)}/>
                  
                  <BiSolidEditAlt 
                  className='list-item-icons'
                   id='edit'
                    title='Edit'
                    onClick={()=>onEdit(to.id)}
                    />
                  <MdDelete
                   className='list-item-icons' 
                   id='delete' 
                   title='Delete' 
                   onClick={()=>onDelete(to.id)
                   } 
                   />
                </span>
              </li>

            ))
          }
        </ul>
      </div>
      {/* {car.color}<br/>
      {car.year}<br/>
      {car.brand}<br/> */}
      {/* <button onClick={()=>setCar({...car,color : 'red'})}>change color</button> */}
    </div>
  )
}

export default Todoapp;


