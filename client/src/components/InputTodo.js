import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description,setDescription] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos",{
                method : "POST",
                headers : {"content-type":"application/json"},
                body : JSON.stringify(body)
            });
            //console.log(response,description);
            window.location = "/";
        } catch (error) {
            console.log(error);         
        }
    }
    
    return (
        <Fragment>
            <h1 style={{ fontWeight: 'bold', textDecoration: 'underline', fontFamily: 'Times New Roman' }} className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5"  onSubmit={onSubmit}>
                <input type="text" className="form-control me-2" value={description} 
                onChange={ e => 
                    setDescription(e.target.value)
                 }/>
                <button className="btn btn-success" >Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;