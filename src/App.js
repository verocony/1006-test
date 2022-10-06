import React, { useState } from 'react';
import './App.css'

function App(){

    const [ todos, updateTodos ] = useState([]) // 할 일을 의미하는 배열
    const [ currentText, updateText ] = useState("") // input에 써져있는 내용

    const [ lastId, updateLastId ] = useState(0)
    const handleSubmit = (event) => {
        event.preventDefault();
        updateTodos([...todos, { content: currentText, id: lastId, isCompleted: false }])
        updateLastId(lastId + 1)
        updateText("")
    }

    const handleDelete = (removeId) => {
        // 콜백이 true 를 반환할 때만 남겨둔다!
        const newTodos = todos.filter((todo) => {
            return todo.id !== removeId
        })
        updateTodos(newTodos)
    }

    const handleComplete = (completeId) => {
        const newTodos = todos.map((todo)=>{
            return todo.id === completeId ? 
            {...todo, isCompleted: !todo.isCompleted } : todo
        })
        updateTodos(newTodos)
    }

    return<>
    <div className='section'>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="할 일을 쓰세요!" 
            value={currentText}
            onChange={e => updateText(e.target.value)} />
            <button type="submit">추가</button>
        </form>
        </div>
        {/* section */}

        <div className='mylist'>
        <h2>Todo List</h2>
        <div className='inner_box'>
            {todos.map((todo, index) => {
                return <div className='list_box' key={index} 
               >
                    <span onClick={() => handleComplete(todo.id)}>{todo.content}</span>
                    <span onClick={() => handleDelete(todo.id)}> &nbsp;&nbsp;X</span>
                </div>
            })}
        </div>
        </div>
        {/* mylist */}
    </>
}

export default App;
