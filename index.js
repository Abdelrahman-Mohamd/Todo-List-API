const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

let tasks = [
  { id: 1, task: "do your homework", completed: false },
  { id: 2, task: "brush your teeth", completed: false },
  { id: 3, task: "take a shower", completed: false },
  { id: 4, task: "eat breakfast", completed: false },
  { id: 5, task: "watch a movie", completed: false },
];

// Endpoint to get all tasks
app.get("/getAllTasks", (req, res) => {
  res.json(tasks);
});

// Endpoint to get a specific task using id
app.get("/task/:id", (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

// Endpoint to add a new task
app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTask = { id: tasks.length + 1, task };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).send("Task description is required");
  }
});

// Endpoint to delete a task using id
app.delete("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).send(`Task with id ${taskId} deleted`);
  } else {
    res.status(404).send("Task not found");
  }
});

app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
});
