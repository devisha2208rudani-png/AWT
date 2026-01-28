const express = require("express")
const app = express()

let TODO = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Todo App</title>
</head>
<body>

<h2>Todo App</h2>

<input type="text" id="id" placeholder="ID">
<input type="text" id="task" placeholder="Task">
<button onclick="addTodo()">Add</button>
<button onclick="updateTodo()">Update</button>
<button onclick="deleteTodo()">Delete</button>

<h3>Todo List</h3>
<ul id="list"></ul>

<script>
function loadTodos() {
    fetch("/todos")
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("list")
        list.innerHTML = ""
        data.forEach(todo => {
            const li = document.createElement("li")
            li.innerText = todo.id + " - " + todo.task
            list.appendChild(li)
        })
    })
}

function addTodo() {
    fetch("/add_todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: document.getElementById("id").value,
            task: document.getElementById("task").value
        })
    }).then(loadTodos)
}

function deleteTodo() {
    fetch("/delete_todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: document.getElementById("id").value
        })
    }).then(loadTodos)
}

function updateTodo() {
    fetch("/update_todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: document.getElementById("id").value,
            task: document.getElementById("task").value
        })
    }).then(loadTodos)
}

loadTodos()
</script>

</body>
</html>
    `)
})

app.get("/todos", (req, res) => {
    res.json(TODO)
})

app.post("/add_todo", (req, res) => {
    TODO.push(req.body)
    res.json(TODO)
})

app.post("/delete_todo", (req, res) => {
    const { id } = req.body
    TODO = TODO.filter(todo => todo.id != id)
    res.json(TODO)
})

app.post("/update_todo", (req, res) => {
    const body = req.body
    TODO = TODO.filter(todo => todo.id != body.id)
    TODO.push(body)
    res.json(TODO)
})

app.listen(3000, () => {
    console.log("Running on http://localhost:3000")
})
