const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

//Mysql Connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"taskboard"
})

//Check the Connection
db.connect(err=>{
    if(err) throw err;
    console.log("Mysql Connected");
});

//Get Tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

//Add Task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO tasks (title) VALUES (?)",
    [title],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, title });
    }
  );
});

// DELETE Task
app.delete("/tasks/:id", function(req, res){
  db.query("DELETE FROM tasks WHERE id = ?",
    [req.params.id], 
    function(err){
        if (err) return res.status(500).send(err);
        res.send("Deleted");
  });
});

app.listen(5000, function(req,res){
    console.log("Server running on port 5000")
});