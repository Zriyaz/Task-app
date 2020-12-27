import React from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from "./components/Home";
import Task from "./components/Task";
import UpdateTask from "./components/UpdateTask";

function App() {
  return (
    <React.Fragment>
        <Router>
          <Route exact path="/" component={Home}/>
          <Route path="/create" component={Task}/>
          <Route path="/update/:id" component={UpdateTask}/>

        </Router>
    </React.Fragment>
  );
}

export default App;
