import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todolist, setTodo] = useState([]);
  const [task, setTask] = useState("");
 
  useEffect(async () => {
      fetchTaskList()
  }, []);
  
  let fetchTaskList = async () => {
    try {
      let todo = await axios.get("https://fyz-todo-app.herokuapp.com/list-all-todo");
      console.log(todo);
      setTodo([...todo.data]);
       setTask('')
    } catch (error) {
      console.log(error);
    }
  }
   

  let handleCreateTask= async() =>{
   try {
       let postData= await axios.post('https://fyz-todo-app.herokuapp.com/create-task',{messege:task})
      fetchTaskList()
   } catch (error) {
     alert(error)
   }
  }

  let handleChange = async(e,id) => {
    try {
      let updateData= await axios.put(`https://fyz-todo-app.herokuapp.com/update-task/${id}`,{status:e.target.checked})
      fetchTaskList()
    } catch (error) {
      alert(error)
    }
  }

  let handleDelete = async(id) =>{
    try {
      let deleteData= await axios.delete(`https://fyz-todo-app.herokuapp.com/delete-task/${id}`)
      fetchTaskList()
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h3>TODO</h3>
          <div class="input-group mb-3">
            <input
              type="text"
              value={task}
              onChange={e => setTask(e.target.value)}
              class="form-control"
              placeholder="Task.."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button onClick={handleCreateTask} class="btn btn-outline-secondary" type="button">
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <ul class="list-group">
            {todolist.map((item) => {
              return (
                <li class="list-group-item">
                  <input
                    class="form-check-input me-1"
                    checked={item.status}
                    type="checkbox"
                    value=""
                    aria-label="..."
                    onChange={(e) => handleChange(e,item._id)}
                  />
                  <span style={{textDecoration:item.status ? 'line-through': ""}}>{item.messege}</span>
                  <span className="badge bg-primary rounded-pill  " onClick={() => handleDelete(item._id)}>X</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
