const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db");

//MiddleWare
app.use(cors());
app.use(express.json());

//Routes

// Create ToDo
app.post("/todos", async(req,res) => {
    try {
        console.log(req.body);
        const{ description } = req.body;
        const newTodo = await pool.query("INSERT INTO TodoList (description) VALUES($1) RETURNING *",[description]);
        
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.erroe(error.message);
    }
});

// Get All ToDo
app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM TodoList");
        res.json(allTodos.rows)
    } catch (error) {
        console.erroe(error.message);
    }
})
// Get a ToDo
app.get("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM TodoList where todo_id = $1",[id]);
        res.json(todo.rows[0])
    } catch (error) {
        console.erroe(error.message);
    }
})

// Update a ToDo
app.put("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE TodoList SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("Todo was Updated succesfuly.")
    } catch (error) {
        console.erroe(error.message);
    }
})

// Delete a ToDo
app.delete("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM TodoList where todo_id = $1",[id]);
        res.json("Todo was Deleted succesfuly.")
    } catch (error) {
        console.erroe(error.message);
    }
})


app.listen(5000, () => {
    console.log("Server started on port 5000");
});
