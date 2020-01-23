import React, { useState, useCallback, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/todotemplate/index";
import TodoInsert from "./components/todoinsert/index";
import TodoList from "./components/totdolist";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080").then(res => {
      setTodos(res.data.result);
    });
    return () => {
      console.log("cleanup");
    };
  }, []);
  const onRemove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
    axios.post(`http://127.0.0.1:8080/delete/${id}`);
  };

  const onInsert = useCallback(
    text => {
      const todo = {
        id: todos[todos.length].id + 1,
        text,
        check: false
      };
      setTodos(todos.concat(todo));
    },
    [todos]
  );

  const onToggle = (id, check) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, check: !todo.check } : todo
      )
    );
    axios.post(`http://127.0.0.1:8080/${id}`, { check: !check });
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
