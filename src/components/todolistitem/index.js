import React from "react";
import styled, { css } from "styled-components";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline
} from "react-icons/md";

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  console.log(todo);
  return (
    <TodoListItemStyled>
      <Checkbox
        isTrue={todo.check}
        onClick={() => onToggle(todo.id, todo.check)}
      >
        {todo.check ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <Text isTrue={todo.check}>{todo.todo}</Text>
      </Checkbox>
      <Remove onClick={() => onRemove(todo.id)}>
        <MdRemoveCircleOutline></MdRemoveCircleOutline>
      </Remove>
    </TodoListItemStyled>
  );
};

const TodoListItemStyled = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background: #f8f9fa;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const Text = styled.div`
  margin-left: 0.5rem;
  flex: 1;

  ${props =>
    props.isTrue &&
    css`
      color: #adb5bd;
      text-decoration: line-through;
    `}
`;

const Checkbox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
  ${props =>
    props.isTrue &&
    css`
      svg {
        color: #22b8cf;
      }
    `}
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

export default TodoListItem;
