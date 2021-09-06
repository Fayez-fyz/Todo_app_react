
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Todo from "./Todo";
import Register from "./Register";
import Login from "./Login";


function App() {
 
  return (
    <Router>
           <Switch>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        
        </Switch>
      </Router>
  )
}

export default App;
