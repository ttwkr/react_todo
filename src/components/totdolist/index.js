import React from "react";
import styled from "styled-components";
import TodoListItem from "../todolistitem/index";

const TodoList = ({ todos, onRemove, onToggle }) => {
  console.log(todos);
  return (
    <TodoListStyled>
      {todos.map(todo => {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            onToggle={onToggle}
          ></TodoListItem>
        );
      })}
    </TodoListStyled>
  );
};

const TodoListStyled = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

export default TodoList;
