import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    // Delete Todo
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
            //console.log(deleteTodo)
        } catch (error) {
            console.error(error.message);
        }
    }

    // Get All Todos
    const GetTodos = async () =>{
        try {
            const response = await fetch('http://localhost:5000/todos');
            const jsonData = await response.json();

            setTodos(jsonData);
            //console.log(jsonData);            
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        GetTodos();
    }, []);

    return (
        <Fragment>
            <h4 style={{ marginTop: '20px', fontWeight: '300', fontStyle: 'italic', textDecoration: 'underline', fontFamily: 'Verdana, sans-serif' }}>List Todos</h4>
                <table className="table  mt-3 text-center table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo)=>(
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo}/>
                                </td>
                                <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </Fragment>
    );
}

export default ListTodos;