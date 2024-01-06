import React, { Fragment, useEffect, useState } from 'react';


const ListTodos = () => {
    const [todos, setTodos] = useState([]);

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
            <h1>List Todos</h1>
                <table class="table  mt-5 text-center table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {todos.map((todo)=>(
                        <tr>
                            <td>{todo.description}</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
        </Fragment>
    );
}

export default ListTodos;