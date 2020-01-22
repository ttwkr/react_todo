import React, { useState, useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/todotemplate/index";
import TodoInsert from "./components/todoinsert/index";
import TodoList from "./components/totdolist";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "리액트 공부하기",
      checked: true
    },
    {
      id: 2,
      text: "컴포넌트 스타일링 해보기",
      checked: true
    },
    {
      id: 3,
      text: "일정 관리 앱 만들어보기",
      checked: false
    }
  ]);

  const [nextId, setNextId] = useState(4);

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
