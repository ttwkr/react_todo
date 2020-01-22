import React, { useState, useCallback, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/todotemplate/index";
import TodoInsert from "./components/todoinsert/index";
import TodoList from "./components/totdolist";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(4);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080").then(res => {
      console.log(res.data.result);
      setTodos(res.data.result);
    });
    return () => {
      console.log("cleanup");
    };
  }, []);
  const onRemove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId,
        text,
        checked: false
      };
      setTodos(todos.concat(todo));
      setNextId(nextId + 1);
    },
    [nextId, todos]
  );

  const onToggle = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <TodoTemplate>
          <TodoInsert onInsert={onInsert} />
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
      </div>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
body {
  margin : 0;
  padding :0;
  background : #e9ecef
}
`;
export default App;
