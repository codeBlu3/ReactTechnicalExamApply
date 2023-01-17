import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { useReducer, useState } from "react";

//1st question regular solution
class App extends React.Component {
  constructor(props) {
    // set the default internal state
    super(); // prior code doesn't have this inheritance
    this.state = {
      clicks: 0,
    };
    this.clickHandler = this.clickHandler.bind(this); // bind so that state is accesible
  }

  componentDidMount() {
    this.refs.myComponentDiv.addEventListener("click", this.clickHandler);
  }

  componentWillUnmount() {
    this.refs.myComponentDiv.removeEventListener("click", this.clickHandler);
  }

  clickHandler() {
    //  the click handler was not binded, thus this.setstate is unaccesible
    this.setState({
      clicks: this.state.clicks + 1, //prior code doesn't access the state
    });
  }

  render() {
    let children = this.props.children;

    return (
      <div className="my-component" ref="myComponentDiv">
        <h2>My Component ({this.state.clicks} clicks)</h2>
        <h3>{this.props.headerText}</h3>
        {children}
      </div>
    );
  }
}

/*
//1st question hooks type
function App() {
    const [numClicks, setNumClicks] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 onClick = {() => setNumClicks(numClicks+ 1) }>My Component {numClicks}</h2>
      </header>
    </div>
  );
}
*/

// second question ------------------------------------------------------------------
/*
function App() {
  const todosReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, action.payload.name];
      case "REMOVE_TODO":
        return state.filter((todo) => todo !== action.payload.name);
    }
  };

  const TodoList = () => {
    const [todos, dispatch] = useReducer(todosReducer, []);
    //add
    const [todoString, setTodoString] = useState("");
    function handleAddTodo(e){
      e.preventDefault();
      dispatch({ type: "ADD_TODO", payload: { name: todoString } });
      setTodoString("");
    };
    function handleChange(e){
      setTodoString(e.currentTarget.value);
    };

    //delete
    function handleRemoveTodo(todo){
         dispatch({
      type: "REMOVE_TODO",
      payload: { name: todo },
    }); 

    }
    return (
      <div>
        <ul>
          {todos.map((todo) => (
            <li>
              <button onClick = {()=> handleRemoveTodo(todo)}>Remove todo {todo}</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Enter todo name"
            value={todoString}
            onChange={handleChange}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TodoList />
      </header>
    </div>
  );
}
*/


// solution to data manipulation ---------------------------------------------------------------
/*
const inputArr = [
  {
    "id": 1,
    "name": "John Doe",
    "status": 1
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "status": 2
  },
  {
    "id": 3,
    "name": "Adam Rocket",
    "status": 2
  },
  {
    "id": 4,
    "name": "Luis Rocket",
    "status": 1
  }
]

function groupbyStatus(objArr) {

  const recordsByStatus= objArr.reduce((acc, value) => {
    if (!acc[value.status]) {
      acc[value.status] = [];
    }
    acc[value.status].push(value);
    return acc;
  }, {})
  const result = Object.fromEntries(
    Object.entries(recordsByStatus).map(([k, v]) => [`status-${k}`, v])
  )
  return result 
}

const outputObj = groupbyStatus(inputArr)
console.log(inputArr)
console.log(outputObj)
*/

export default App;
